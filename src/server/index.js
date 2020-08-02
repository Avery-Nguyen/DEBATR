const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const { videoToken } = require('./tokens');
const io = require('socket.io').listen(8080);
const apiRoutes = require('./routes.js')
const cookieSession = require('cookie-session');


// Added for Alex's Proof Of Concept
let val = true
io.sockets.on('connection', function (socket) {
  setInterval(() => {
    if (val) {
      // Hello is basically the header, 'Dog' is the message.
      socket.emit('Hello', 'Dog')
    } else {
      socket.emit('Hello', 'Cat')
    }
    val = !val
  }, 1000)

  socket.on('join', function (data) {
    socket.join(data.email); // We are using room of socket io
  });
});

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use(pino);

app.use('/api', apiRoutes)


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
