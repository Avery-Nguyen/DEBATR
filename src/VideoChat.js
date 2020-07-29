import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import TestRoom from './TestRoom';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:8080";


const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState("");
  const [testRoom, setTestRoom] = useState("");
  const [currentTestRoom, setCurrentTestRoom] = useState("")
  const [currentSocket, setCurrentSocket] = useState(null)
  const [roomList, setRoomList] = useState([])


  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    setCurrentSocket(socket)
    socket.on("Hello", data => {
      setResponse(data);
    });



    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const roomAddHandler = (testRoom) => {
    setCurrentTestRoom(testRoom)
    setRoomList([...roomList, testRoom])
    currentSocket.emit('joinRoom', testRoom)
  }

  const roomChangeHandler = (testRoom) => {
    setCurrentTestRoom(testRoom)
    currentSocket.emit('joinRoom', testRoom)
  }



  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          room: roomName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      setToken(data.token);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <div>
        <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
        <p>
          SocketMessage = {response}
          <form
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              name="name"
              value={testRoom}
              onChange={(event) => setTestRoom(event.target.value)}
            />
          <button onClick={(event) => roomAddHandler(testRoom)}>
            Create Room
          </button>
          {roomList.map(room => {
            return <TestRoom currentTestRoom={currentTestRoom} exRoomName={room} setRoomName={roomChangeHandler} />
          })}
          </form>
        </p>
      </div>
    );
  }
  return render;
};

export default VideoChat;
