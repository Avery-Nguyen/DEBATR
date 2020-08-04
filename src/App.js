import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import ReactDOM from 'react-dom';
import Stage from './components/stage/stage';
// import Rating from './components/partials/rating'
// import DiscreteSlider from './components/partials/slider'
// import UserCard from './components/user-card/userCard'
import Dashboard from './components/dashboard/dashboard'
import Lobby from './components/lobby/lobby'
import NavBar from './components/nav/nav'
import PostDebate from './components/post-debate/postDebate'
import './components/partials/slider.css'
// import SocketContext from './SocketContext'
import socketIOClient from "socket.io-client";
import SignUp from './components/sign-up/signUp';
import CreateRoom from './components/create-room/createRoom';
import { useStore } from './Store'
import WaitingRoom from './components/waiting-room/waitingRoom';
import PastDebate from './components/past-debates/pastDebates'
import axios from "axios"


// LOBBY
// WAITING (for token)
// ACTIVE (in debate)
// GAME_OVER (for reviews) -> LOBBY
// CONNECTION_ERROR (other user leaves or other error)


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {

  const [state, dispatch] = useStore();
  const [roomState, setRoomState] = useState({})
  const [activeRoomState, setActiveRoomState] = useState({})

  const [open, setOpen] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const [currentSocket, setCurrentSocket] = useState(null)

  useEffect(() => {
    const ENDPOINT = "http://127.0.0.1:3001";
    const socket = socketIOClient(ENDPOINT);
    dispatch({ type: 'SET_CURRENTSOCKET', payload: socket })
    // setCurrentSocket(socket)
    return () => socket.disconnect();
  }, [dispatch]);

  // Assign random username for time being
  useEffect(() => {
    if (state.username === undefined) {
      dispatch({ type: 'SET_USERNAME', payload: Math.random().toFixed(5).toString() })
    }
  }, [dispatch, state.username])

  useEffect(() => {
    if (state.currentSocket) {
      state.currentSocket.on("initialRoomList", data => {
        const rLParse = JSON.parse(data)
        // Want this to be an object of rooms
        setRoomState(prevState => ({ ...prevState, ...rLParse }))
      })

      state.currentSocket.on('startGame', data => {
        fetch('/video/token', {
          method: 'POST',
          body: JSON.stringify({
            identity: state.username,
            room: state.currentRoom
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
          .then((fetchData) => {
            dispatch({type: 'SET_VISUAL_MODE', payload: "ACTIVE"});
            dispatch({type:'SET_TOKEN', payload: fetchData.token})
          })
      })

      state.currentSocket.on('currentRoomUpdate', data => {
        // data to only update the current room state. 
        setActiveRoomState(prev => ({...prev, ...data}));
      }
      )
    }

    // Cleanup function for socket listeners
    return (() => {
      if(state.currentSocket) {
        state.currentSocket.off('startGame')
        state.currentSocket.off('initialRoomList')
      }
    })
  }, [state.currentSocket, state.currentRoom, dispatch, state.username]);

  

  const lobby = (
    <main style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <Button
          style={{
            color: "white",
            backgroundColor: "rgb(64,81,182)",
            border: "rgb(64,81,182) solid 1px",
            borderRadius: "30px",
            marginTop: '5px',
            // maxWidth: '55px',
            justifySelf: 'center'
          }}
          onClick={handleClickOpen}
        >
          Create Stage
        </Button>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <CreateRoom handleClose={handleClose} />
        </Dialog>
        
        <Lobby roomState={roomState} />
        <h1 style={{ display: 'flex', justifyContent: 'center', border: 'solid 3px black' }}>Past Debates</h1>
        <span></span>
        <PastDebate />
      </main>
  )

  const waitingRoom = (
    <main>
      <WaitingRoom />
    </main>
  )

  const stage = (
    <main>
      <Stage activeRoomState={ activeRoomState}
      />
    </main>
  )
  
  const postDebate = (
    <main>
      <PostDebate activeRoomState={activeRoomState}/>
    </main>
  )

  const connectionError = (
    <main>
      <h1>your BUDDY left the game!</h1>
    </main>
  )
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>      
      
      {state.visualMode === "ACTIVE" && state.token && stage}
      {state.visualMode === "WAITING" && waitingRoom}
      {state.visualMode === "LOBBY" && lobby}
      {state.visualMode === "GAME_OVER" && postDebate}
      {state.visualMode === "CONNECTION_ERROR" && connectionError}
      
      <footer style={{ fontSize: "10px" }}>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ♥️
          </span>{' '}
          and{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <p>AAA+</p>
        </p>
      </footer>
    </div>
  );
};

export default App;