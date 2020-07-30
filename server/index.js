const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const io = require('socket.io').listen(8080);

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
  get allRooms() {
    return this.roomList
  }
  // this could include summary stats like average score, etc. For simplicy, just the count for now
  get numberOfRooms() {
    return this.roomList.length
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

  messageAllUsers(message) {
    io.to(this.name).emit(message)
  }
}
const roomList = new Rooms('roomList');

roomList.newRoom('testRoom')
roomList.newRoom('otherRoom')


let interval;
io.sockets.on('connection', function (socket) {
  // Send roomList to each new participant
  rLString = JSON.stringify(roomList.allRooms)
  socket.emit('initialRoomList', rLString)
  console.log('all rooms being sent: ', roomList.allRooms)

  interval = setInterval(() => {
    // if (val) {
    //   // Hello is basically the header, 'Dog' is the message.
    //   socket.emit('Hello', 'Dog')
    // } else {
    //   socket.emit('Hello', 'Cat')
    // }
    // val = !val

    rLString = JSON.stringify(roomList.allRooms)
    io.emit('initialRoomList', rLString)
    
  }, 500)

  // These are all custom functions
  socket.on('disconnect', function (socket) {
    console.log('socket disconnected')
    clearInterval(interval)
  })

  socket.on('createRoom', function (data) {
    console.log('Data: ', data)
    console.log(`Request to Create ${data.roomName} by ${data.userName} received.`)
    socket.emit(`Request to Create ${data} received.`)
    roomList.newRoom(data.roomName)
    roomList.roomList[data.roomName]['host'] = data.userName

    rLString = JSON.stringify(roomList.allRooms)
    socket.emit('initialRoomList', rLString)
    // roomList = [...Room, data]
    // socket.join(data.email); // We are using room of socket io
    console.log(`Current roomList is ${roomList.allRooms}`)
  });

  socket.on('joinRoom', function (data) {
    console.log(`Request to join ${data.roomName} from ${data.userName} received.`)
    // Add to room list
    roomList.roomList[data.roomName]['contender'] = data.userName

    // Send out update
    rLString = JSON.stringify(roomList.allRooms)
    socket.join(data.roomName)
    socket.emit('initialRoomList', rLString)

    if (roomList.roomList[data.roomName]['contender'] && roomList.roomList[data.roomName]['host']) {
      console.log(`${data.roomName} iS FULL`)
      io.in(data.roomName).emit('update', 'ROOM IS FULL using io!')
      socket.broadcast.to(data.roomName).emit('update', 'ROOM IS FULL!')
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

    rLString = JSON.stringify(roomList.allRooms)
    socket.emit('initialRoomList', rLString)

  })
});

const app = express();
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

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);
