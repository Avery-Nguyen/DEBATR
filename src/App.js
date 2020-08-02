import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import VideoChat from './VideoChat';
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
import {useStore} from './Store'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {

  const [state, dispatch] = useStore();

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
    dispatch({type: 'SET_CURRENTSOCKET', payload: socket})
    // setCurrentSocket(socket)

    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <div className="app">
        <header>
          <NavBar />
        </header>
        <main>

          {/* <SocketContext.Provider value={currentSocket}> */}
          <Button
            color="secondary"
            backgroundColor='black'
            onClick={handleClickOpen}
          >
            Create Room
        </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
          >
            <CreateRoom />
          </Dialog>
          <PostDebate />
          <Lobby />
          {/* <VideoChat currentSocket={currentSocket} /> */}
          {/* </SocketContext.Provider> */}

        </main>
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
