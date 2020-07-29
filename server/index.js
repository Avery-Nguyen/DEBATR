const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const io = require('socket.io').listen(8080);

// Alex's SOCKET code
let val = true
let roomList = [];


// Class framework for each Room. Will allow us to manage the rooms better
// Will probably need to store all these in an array or another class.
// Could potentially do objects to but I think this is smarter
// https://socket.io/docs/rooms/
class Room {
  constructor(name) {
    this.name = name;
    this.users = {
      host: null,
      contender: null,
      spectators: []
    }
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


  messageAllUsers(message) {
    io.to(this.name).emit(message)
  }
}

const testRoom = new Room('testRoom')


let interval;
io.sockets.on('connection', function (socket) {
  // Send roomList to each new participant
  const rLString = JSON.stringify(roomList)
  socket.emit('initialRoomList', rLString)

  interval = setInterval(() => {
    if (val) {
      // Hello is basically the header, 'Dog' is the message.
      socket.emit('Hello', 'Dog')
    } else {
      socket.emit('Hello', 'Cat')
    }
    val = !val
  }, 1000)

  // These are all custom functions
  socket.on('disconnect', function (socket) {
    console.log('socket disconnected')
    clearInterval(interval)
  })

  socket.on('createRoom', function (data) {
    console.log(`Request to Create ${data} received.`)
    socket.emit(`Request to Create ${data} received.`)
    roomList = [...roomList, data]
    // socket.join(data.email); // We are using room of socket io
    console.log(`Current roomList is ${roomList}`)
  });

  socket.on('joinRoom', function (data) {
    console.log(`Request to join ${data} received.`)
    socket.emit(`Request to join ${data} received.`)

  });


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
