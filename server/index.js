const config = require('./config');
const app = require('express')();
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const http=require('http').createServer(app)
const io = require('socket.io')(http);

// Alex's SOCKET code
let val = true
let rLString;

// This class holds an array of all the rooms
class Rooms {
  constructor() {
    this.roomList = {}
  }
  
  newRoom(name) {
    let r = new Room(name)
    this.roomList[r.name] = r
    return r
  }

  delRoom(name) {
    this.roomList[name] = null
  }

  get allRooms() {
    return this.roomList
  }
  // this could include summary stats like average score, etc. For simplicy, just the count for now
  get numberOfRooms() {
    return this.roomList.length
  }

  sendRoomUpdate() {
    rLString = JSON.stringify(roomList.allRooms)
    io.to('lobby').emit('initialRoomList', rLString)
  }
}


// Class framework for each Room. Will allow us to manage the rooms better
// Will probably need to store all these in an array or another class.
// Could potentially do objects to but I think this is smarter
// https://socket.io/docs/rooms/
class Room {
  constructor(name) {
    this.name = name;
    this.host = null;
    this.contender = null;
    this.spectators = [];
    this.topic = 'Topic Name';
    this.hostArg = 'Is the Greatest';
    this.contenderArg = 'Is the Worst';
    this.status = 'Waiting';
    this.hostPoints = 0;
    this.contenderPoints = 0;
    this.messages = [{
      timeStamp: 20200700456,
      fromUser: 'Alex',
      message: 'Lets go!'
    },
    {
      timeStamp: 20200700456,
      fromUser: 'Avery',
      message: 'OK!'
    }]
  }

  get numberOfUsers() {
    return this.users
  }

  messageRoomUsers(message, user='Server') {
    io.to(this.name).emit('message', {
      roomName: this.name,
      fromUser: user,
      message: message})
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  startGame() {
    io.to(this.name).emit('gameCommand', 'startGame')
    this.sleep(3000)
    .then(() => {
      io.to(this.name).emit('gameCommand', 'hostTurn')
      io.to(this.name).emit('mute', this.contender)})
      .then(() => {
        this.sleep(3000)
        .then(() => {
          io.to(this.name).emit('gameCommand', 'contenderTurn')
          io.to(this.name).emit('unMute', this.contender)
          io.to(this.name).emit('mute', this.host)
        })
        .then(() => this.sleep(2000)
        .then(() => {
          io.to(this.name).emit('gameCommand', 'test - game over!')
        }))
    })

  }
}
const roomList = new Rooms('roomList');

roomList.newRoom('testRoom')
roomList.newRoom('otherRoom')


let interval;
io.sockets.on('connection', function (socket) {
  // Send roomList to each new participant
  socket.join('lobby')
  rLString = JSON.stringify(roomList.allRooms)
  // Send room data to client that just connected.
  socket.emit('initialRoomList', rLString)
  console.log('all rooms being sent: ', Object.keys(roomList.allRooms))

  // interval = setInterval(() => {
  //   // rLString = JSON.stringify(roomList.allRooms)
    
  // }, 10000)

  socket.on('disconnect', function (socket) {
    console.log('socket disconnected')
  })


  socket.on('createRoom', function (data) {
    console.log('Data: ', data)
    console.log(`Request to Create ${data.roomName} by ${data.userName} received.`)

    roomList.newRoom(data.roomName)
    roomList.roomList[data.roomName]['host'] = data.userName

    roomList.sendRoomUpdate()
    // rLString = JSON.stringify(roomList.allRooms)
    // socket.emit('initialRoomList', rLString)
    console.log(`Current roomList is ${roomList.allRooms}`)
  });

  socket.on('joinRoom', function (data) {
    console.log(`Request to join ${data.roomName} from ${data.userName} received.`)
    // Add to room list
    roomList.roomList[data.roomName]['contender'] = data.userName

    // Send out update
    
    // rLString = JSON.stringify(roomList.allRooms)
    socket.join(data.roomName)

    // socket.emit('initialRoomList', rLString)
    roomList.sendRoomUpdate()

    // Room is full if host & contender
    if (roomList.roomList[data.roomName]['contender'] && roomList.roomList[data.roomName]['host']) {
      console.log(`${data.roomName} is FULL`)
      io.in(data.roomName).emit('update', 'ROOM IS FULL using io!')
      // This works but easier to use a Room method.
      // socket.broadcast.to(data.roomName).emit('update', 'ROOM IS FULL!')
      roomList.roomList[data.roomName]['messages'].push({
        timeStamp: 20200700456,
        fromUser: 'Server',
        message: 'Room is full!'
      })

      roomList.sendRoomUpdate()

      roomList.roomList[data.roomName].startGame();

      // io.to(data.roomName).emit('mute',roomList.roomList[data.roomName]['contender'])

    }


    socket.emit(`Request to join ${data} received.`)


    

  });

  socket.on('leaveRoom', function (data) {
    console.log(`Request to leave ${data.roomName} from ${data.userName} received.`)

    if (roomList.roomList[data.roomName]['contender'] === data.userName) {
      roomList.roomList[data.roomName]['contender'] = null
    } else if (roomList.roomList[data.roomName]['host'] === data.userName) {
      roomList.roomList[data.roomName]['host'] = null
    }

    socket.leave(data.roomName)
    roomList.sendRoomUpdate()

    // rLString = JSON.stringify(roomList.allRooms)
    // socket.emit('initialRoomList', rLString)
  })

  socket.on('message', function(data) {
    console.log(`Message received from ${data.userName} - ${data.message}`)
    roomList.roomList[data.roomName]['messages'].push({
      timeStamp: 20200700456,
      fromUser: data.userName,
      message: data.message
    })

    roomList.sendRoomUpdate()
  })
});

// const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const sendTokenResponse = (token, res) => {
  res.set('Content-Type', 'application/json');
  res.send(
    JSON.stringify({
      token: token.toJwt()
    })
  );
};

app.get('/api/greeting', (req, res) => {
  const name = req.query.name || 'World';
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
});

app.get('/video/token', (req, res) => {
  const identity = req.query.identity;
  const room = req.query.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);

});
app.post('/video/token', (req, res) => {
  const identity = req.body.identity;
  const room = req.body.room;
  const token = videoToken(identity, room, config);
  sendTokenResponse(token, res);
});

http.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
