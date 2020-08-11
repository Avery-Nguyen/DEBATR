const config = require('./config');
const app = require('express')();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const apiRoutes = require('./routes')
const cookieSession = require('cookie-session');
const db = require('./db.js');
const topicRoutes = require("./topics");
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const {
  postResultsToDatabase
} = require('./databaseCalls.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use('/api', apiRoutes(db))

app.use(pino);


// Alex's SOCKET code
let rLString;
let debtateTime = 3;
let intermissionTime = 3;
let round1Time = 15;
let round2Time = 15;
let finalround = 30;
// let round1Time = 15;
// let round2Time = 30;
// let finalround = 45;
// This class holds an array of all the rooms
class Rooms {
  constructor() {
    this.roomList = {};
    this.socketDirectory = {}
  }

  newRoom(name, topic, socketID, topic_id) {
    let r = new Room(name, topic, topic_id);
    this.roomList[r.name] = r;
    this.socketDirectory[socketID] = [r.name]
    return r;
  }

  delRoom(name) {
    // this.roomList[name] = null;
    // console.log('Deleting room ', name)
    // console.log('org roomList: ', this.roomList)
    delete this.roomList[name]
    // console.log('new roomList: ', this.roomList)
  }

  get allRooms() {
    return this.roomList;
  }
  // this could include summary stats like average score, etc. For simplicy, just the count for now
  get numberOfRooms() {
    return this.roomList.length;
  }

  sendRoomUpdate() {
    rLString = JSON.stringify(roomList.allRooms);
    io.to("lobby").emit("initialRoomList", rLString);
  }
}

// Class framework for each Room. Will allow us to manage the rooms better
// Could potentially do objects to but I think this is smarter
// https://socket.io/docs/rooms/
class Room {
  constructor(name, topic, topic_id = null) {
    this.name = name; //random string to connect to twilio room
    this.game_id = null;
    this.host = null; //username
    this.host_id = null;
    this.host_ready = false;
    this.host_avatar = null;
    this.contender = null; //username
    this.contender_id = null;
    this.contender_ready = false;
    this.contender_avatar = null;
    this.spectators = [];
    this.topic = topic;
    this.topic_id = topic_id;
    this.status = "Waiting";
    this.hostPoints = 0;
    this.contenderPoints = 0;
    this.messages = [];
  }

  get numberOfUsers() {
    return this.users;
  }

  messageRoomUsers(message, user = "Server") {
    io.to(this.name).emit("message", {
      roomName: this.name,
      fromUser: user,
      message: message,
    });
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }


  startRealGame() {
    // The framework of the game! Toggles the turns
    io.to(this.name).emit(
      "bothReady"
    );
    this.sleep(100)
      .then(() => {
        io.to(this.name).emit(
          "gameCommand",
          `Round 1 - ${this.host} is talking`
        );
        io.to(this.name).emit("setTimer", round1Time)
        io.to(this.name).emit("mute", this.contender)
        
      })
      .then(() => this.sleep(round1Time * 1000))
      .then(() => {
        this.postGameToDatabase();
        io.to(this.name).emit('gameCommand', `Round 1 - ${this.contender} is talking`)
        io.to(this.name).emit("setTimer", round1Time)
        io.to(this.name).emit("mute", this.host)
        io.to(this.name).emit('unMute', this.contender)
      })
      .then(() => this.sleep(round1Time * 1000))
      .then(() => {
        io.to(this.name).emit("gameCommand", `Round 1 Intermission`);
        io.to(this.name).emit("setTimer", intermissionTime)
        io.to(this.name).emit("mute", this.contender)
      })
      .then(() => this.sleep(intermissionTime * 1000))
      .then(() => {
        io.to(this.name).emit(
          "gameCommand",
          `Round 2 - ${this.host} is talking`
          );
          
          io.to(this.name).emit("setTimer", round2Time)
          io.to(this.name).emit('unMute', this.host)
        })
        .then(() => this.sleep(round2Time * 1000))
        .then(() => {
          this.postGameToDatabase();
          io.to(this.name).emit('gameCommand', `Round 2 - ${this.contender} (Agrees) is talking`)
        io.to(this.name).emit("setTimer", round2Time)
        io.to(this.name).emit("mute", this.host)
        io.to(this.name).emit('unMute', this.contender)
      })
      .then(() => this.sleep(round2Time * 1000))
      .then(() => {
        io.to(this.name).emit("gameCommand", `Final Round - Open Debate!`);
        io.to(this.name).emit('unMute', this.host)
        io.to(this.name).emit("setTimer", finalround)
      })
      .then(() => this.sleep(finalround * 1000))
      .then(() => {

        io.to(this.name).emit('gameCommand', 'Game over')

        // Ends the game for the user - Brings up post-debtate review screen
        io.to(this.name).emit('gameOver', null)
      })
  }

  postGameToDatabase() {
    // use function imported from databaseCalls.js
    postResultsToDatabase(db, {
      topic_id: this.topic_id,
      host_id: this.host_id,
      contender_id: this.contender_id,
    }).then((res) => {
      // console.log("Response from SQL server after posting: ", res);
      this.game_id = res[0].id
      io.to(this.name).emit(
        "currentRoomUpdate",
        roomList.roomList[this.name]
      );
      roomList.sendRoomUpdate()
    })
    .catch(err => console.log(err))
  }
}

// Roomslist is an instance of the roomS class.
const roomList = new Rooms("roomList");

// Seed data
roomList.newRoom("room1", "Vancouver is the worst!");
roomList.roomList['room1'].contender = "Rishav";
roomList.newRoom("room2", "jQuery is amazing");
roomList.roomList['room2'].contender = "Eric";
roomList.newRoom("room3", "Glen is cooler than Bradley");
roomList.roomList['room3'].host = "Glen";
roomList.newRoom("room4", "VIM is an easy-to-use text-editor");
roomList.roomList['room4'].host = "Andy";

io.sockets.on("connection", function (socket) {
  // Send roomList to each new participant
  socket.join("lobby");
  rLString = JSON.stringify(roomList.allRooms);
  // Send room data to client that just connected.
  socket.emit("initialRoomList", rLString);
  // console.log('all sockets', Object.keys(io.sockets.sockets))

  socket.on("disconnect", function () {
    if (roomList.socketDirectory[socket.id]) {
      io.to(roomList.socketDirectory[socket.id]).emit('disconnect')
      roomList.delRoom(roomList.socketDirectory[socket.id])
    }
    roomList.sendRoomUpdate();
    // console.log('this sockets id', socket.id)
    // console.log('all sockets', Object.keys(io.sockets.sockets))
    // console.log("socket disconnected");
  });

  socket.on("createRoom", function (data) {
    // console.log(
    //   `Request to Create ${data.roomName} by ${data.userName} topic ${data.topic} topicID: ${data.topicID} received.`
    // );

    // Socket Joins the 'socket'room'
    socket.leave('lobby');
    socket.join(data.roomName);
    // Also create an instance of the room class.
    roomList.newRoom(data.roomName, data.topic, socket.id, data.topicID);
    // Assign the username as host of the newly created class.

    if (data.stance) {
      roomList.roomList[data.roomName]["host"] = data.userName;
      roomList.roomList[data.roomName]["host_id"] = data.userID;
      roomList.roomList[data.roomName]["host_avatar"] = data.avatar;
    } else {
      roomList.roomList[data.roomName]["contender"] = data.userName;
      roomList.roomList[data.roomName]["contender_id"] = data.userID;
      roomList.roomList[data.roomName]["contender_avatar"] = data.avatar;
    }

    // Send an updated room list to everyone in the lobby.
    roomList.sendRoomUpdate();
    // console.log(`Current roomList is ${roomList.allRooms}`);

    io.to(data.roomName).emit(
      "currentRoomUpdate",
      roomList.roomList[data.roomName]
    );
  });

  socket.on("joinRoomSpectator", function (data) {
    socket.join(data.roomName);
    socket.leave('lobby')

    io.to(data.roomName).emit(
      "currentRoomUpdate",
      roomList.roomList[data.roomName]
    );
  })
  socket.on("ready", function (data) {
    if (roomList.roomList[data.roomName]["host"] === data.userName) {
      roomList.roomList[data.roomName]["host_ready"] = true
    } else if (roomList.roomList[data.roomName]["contender"] === data.userName) {
      roomList.roomList[data.roomName]["contender_ready"] = true
    }

    // io.to(this.name).emit('gameCommand', `${this.host} (Agrees) is muted!`)

    roomList.roomList[data.roomName]["messages"].push({
      timeStamp: 20200700456,
      fromUser: "Server",
      message: `${data.userName} is ready.`,
    });



    if (roomList.roomList[data.roomName]["host_ready"] && roomList.roomList[data.roomName]["contender_ready"]) {
      roomList.roomList[data.roomName]["messages"].push({
        timeStamp: 20200700456,
        fromUser: "Server",
        message: "Both players are ready! Game starting soon...",
      });

      roomList.sendRoomUpdate();

      // Starts the game method!
      roomList.roomList[data.roomName].startRealGame()
    }



    io.to(data.roomName).emit(
      "currentRoomUpdate",
      roomList.roomList[data.roomName]
    );
  })
  socket.on("leaveRoomSpectator", function (data) {
    socket.leave(data.roomName);
    socket.join('lobby')
    roomList.sendRoomUpdate();
  })

  socket.on("joinRoom", function (data) {
    // console.log(
    //   `Request to join ${data.roomName} from ${data.userName} received.`
    // );
    // Add to room list
    if (roomList.roomList[data.roomName]["host"]) {
      roomList.roomList[data.roomName]["contender"] = data.userName;
      roomList.roomList[data.roomName]["contender_id"] = data.userID;
    } else if (roomList.roomList[data.roomName]["contender"]) {
      roomList.roomList[data.roomName]["host"] = data.userName;
      roomList.roomList[data.roomName]["host_id"] = data.userID;
    }


    roomList.socketDirectory[socket.id] = data.roomName;

    // Socket Joins the 'socket'room'
    socket.join(data.roomName);
    socket.leave('lobby')


    if (roomList.roomList[data.roomName]["host"] && roomList.roomList[data.roomName]["contender"]) {
      //  Assigns token to both users
      io.to(data.roomName).emit("startGame", {
        roomName: data.roomName,
      });

    }
    // Send out update to everyone in the room.
    roomList.sendRoomUpdate();
    io.to(data.roomName).emit(
      "currentRoomUpdate",
      roomList.roomList[data.roomName]
    );

  });

  socket.on("leaveRoom", function (data) {
    // console.log(
    //   `Request to leave ${data.roomName} from ${data.userName} received.`
    // );

    roomList.delRoom(data.roomName)
    socket.leave(data.roomName);
    socket.join('lobby')
    io.to(data.roomName).emit('disconnect')
    roomList.socketDirectory[socket.id] = null
    roomList.sendRoomUpdate();
  });



  socket.on("message", function (data) {
    // console.log(`Message received from ${data.userName} - ${data.message}`);
    roomList.roomList[data.roomName]["messages"].push({
      timeStamp: 20200700456,
      fromUser: data.userName,
      message: data.message,
    });

    io.to(data.roomName).emit(
      "currentRoomUpdate",
      roomList.roomList[data.roomName]
    );
  });
});

// const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cookieSession({
    name: "session",
    keys: ["key1", "key2"],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);


app.use("/api", topicRoutes(db));

const sendTokenResponse = (token, res) => {
  res.set("Content-Type", "application/json");
  res.send(
    JSON.stringify({
      token: token.toJwt(),
    })
  );
};




app.get("/video/token", (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});
app.post("/video/token", (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

http.listen(3001, () => {
  console.log("Express server is running on localhost:3001")
});
