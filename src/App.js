import React, {useEffect, useState} from 'react';
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
import SocketContext from './SocketContext'
import socketIOClient from "socket.io-client";
import SignUp from './components/sign-up/signUp';
import CreateRoom from './components/create-room/createRoom';
import WaitingRoom from './components/waiting-room/waitingRoom';
import PastDebate from './components/past-debates/pastDebates'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [currentSocket, setCurrentSocket] = useState(null)

  useEffect(() => {
    const ENDPOINT = "http://127.0.0.1:3001";
    const socket = socketIOClient(ENDPOINT);
    setCurrentSocket(socket)

    return () => socket.disconnect();
  }, []);
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
        <Button
          style={{
            color:"white",
            backgroundColor:"rgb(64,81,182)",
            border:"rgb(64,81,182) solid 1px",
            borderRadius: "30px",
            marginTop:'5px',
            // maxWidth: '55px',
            justifySelf:'center'
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
            <CreateRoom /> 
          </Dialog>
        <Lobby />

      {/* <SocketContext.Provider value={currentSocket}>
        <VideoChat currentSocket={currentSocket} />
      </SocketContext.Provider> */}

<h1 style={{display:'flex', justifyContent:'center', border:'solid 3px black'}}>Past Debates</h1>
<span></span>

<PastDebate />
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
