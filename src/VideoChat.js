import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import TestRoom from './TestRoom';
import socketIOClient from "socket.io-client";

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  // Alex's code, we should move into a reducer
  const [response, setResponse] = useState("");
  const [testRoom, setTestRoom] = useState("");
  const [currentTestRoom, setCurrentTestRoom] = useState("")
  // Need this to access the socket outside of the second useEffect below
  const [currentSocket, setCurrentSocket] = useState(null)
  const [roomState, setRoomState] = useState({})

  // ALEX CODE: UseEffect to Create Socket
  useEffect(() => {
    const ENDPOINT = "http://127.0.0.1:8080";
    const socket = socketIOClient(ENDPOINT);
    setCurrentSocket(socket)

    return () => socket.disconnect();
  }, []);

  // ALEX CODE: Assign socket handlers
  useEffect(() => {
    if (currentSocket) {
      currentSocket.on("Hello", data => {
        setResponse(data);
      });

      currentSocket.on("initialRoomList", data => {
        const rLParse = JSON.parse(data)
        const roomsToLoadFromServer = Object.keys(rLParse)

        console.log(`Rooms to load from server: ${roomsToLoadFromServer}`)
        console.log(`RoomList retrieved from server: ${data}`)

        // This is an array of the room names
        // setRoomList(prev => [...prev, ...roomsToLoadFromServer])

        // Want this to be an object of rooms
        setRoomState(prevState => ({ ...prevState, ...rLParse}))
      })
    }

  }
    , [currentSocket]);

  // ALEX's CODE
  const roomAddHandler = (testRoom) => {
    if (currentTestRoom) {
      currentSocket.emit('leaveRoom', {
        roomName : currentTestRoom,
        userName : 'Test Man'
      })
    }
    setCurrentTestRoom(testRoom)
    // setRoomList([...roomList, testRoom])
    currentSocket.emit('createRoom', {
      roomName : testRoom,
      userName : 'Test Man'
    })
  }

  const roomChangeHandler = (testRoom) => {
    if (currentTestRoom) {
      currentSocket.emit('leaveRoom', {
        roomName : currentTestRoom,
        userName : 'Test Man'
      })
    }
    setCurrentTestRoom(testRoom)
    currentSocket.emit('joinRoom', {
      roomName : testRoom,
      userName : 'Test Man'
    })
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
    const roomListMap = Object.keys(roomState).map((keyName, i) => (
      <TestRoom currentTestRoom={currentTestRoom} exRoomName={keyName} objProps={roomState[keyName]} setRoomName={roomChangeHandler} />
    ))
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
            {roomListMap}
          </form>
        </p>
      </div>
    );
  }
  return render;
};

export default VideoChat;
