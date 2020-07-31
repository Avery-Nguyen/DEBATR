import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import TestRoom from './TestRoom';
import SocketContext from './SocketContext'

const VideoChat = ({currentSocket}) => {
  const [username, setUsername] = useState('');
  console.log("VideoChat -> username", username)
  const [roomName, setRoomName] = useState('');
  console.log("VideoChat -> roomName", roomName)
  const [token, setToken] = useState(null);
  console.log("VideoChat -> token", token)

  // Alex's code, we should move into a reducer
  const [testRoom, setTestRoom] = useState("");
  const [currentTestRoom, setCurrentTestRoom] = useState("")
  // Need this to access the socket outside of the second useEffect below
  const [roomState, setRoomState] = useState({})

  // ALEX CODE: UseEffect to Create Socket
 

  // ALEX CODE: Assign socket handlers
  useEffect(() => {
    if (currentSocket) {
      currentSocket.on("initialRoomList", data => {
        const rLParse = JSON.parse(data)
        // Want this to be an object of rooms
        setRoomState(prevState => ({ ...prevState, ...rLParse}))
      })

      currentSocket.on('startGame', data => {
        const randName = Math.random().toFixed(5).toString()
        // handleSubmit()
        console.log('data.roomname', data.roomName)
        console.log('randName', randName)
        
        fetch('/video/token', {
          method: 'POST',
          body: JSON.stringify({
            identity: randName,
            room: data.roomName
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .then((fetchData) => setToken(fetchData.token))
        setRoomName(data.roomName)
        setUsername(`${randName}`)
      })
    }
  }, [currentSocket]);

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

  const sendMessageHandler = (message) => {
    currentSocket.emit('message', {
      roomName : currentTestRoom,
      userName : 'Test Man',
      message: message
    })
  }


  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  // const handleSubmit = useCallback(
  //   async event => {
  //     if(event) {
  //       event.preventDefault();
  //     }
      
  //     console.log('roomName in the Fetch REQ', roomName)
  //     console.log('username in the Fetch REQ', username)
  //     const data = await fetch('/video/token', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         identity: username,
  //         room: roomName
  //       }),
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     }).then(res => res.json());
  //     setToken(data.token);
  //   },
  //   [roomName, username]
  // );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token && roomName) {
    render = (
      <SocketContext.Provider value={currentSocket}>
      <Room roomName={roomName} token={token} handleLogout={handleLogout} currentSocket={currentSocket} username={username} roomState={roomState} currentTestRoom={currentTestRoom}/>
      </SocketContext.Provider>
    );
  } else {
    const roomListMap = Object.keys(roomState).map((keyName, i) => (
      <TestRoom currentTestRoom={currentTestRoom} exRoomName={keyName} objProps={roomState[keyName]} setRoomName={roomChangeHandler} sendMessageHandler={sendMessageHandler} />
    ))
    render = (
      <div>
        {/* <Lobby
          username={username}
          roomName={roomName}
          handleUsernameChange={handleUsernameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />  */}
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
      </div>
    );
  }
  return render;
};

export default VideoChat;
