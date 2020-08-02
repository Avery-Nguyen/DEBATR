import React, {useEffect, useState} from 'react';
import './App.css';
import VideoChat from './VideoChat';
import ReactDOM from 'react-dom';
import Stage from './components/stage/stage';
// import Rating from './components/partials/rating'
// import DiscreteSlider from './components/partials/slider'
// import UserCard from './components/user-card/userCard'
import Dashboard from './components/dashboard/dashboard'
import Lobby from './components/lobby/lobby'
import NavBar from './components/nav/nav'

import './components/partials/slider.css'
import SocketContext from './SocketContext'
import socketIOClient from "socket.io-client";
import SignUp from './components/sign-up/signUp';



const App = () => {
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
      <main>
      <SocketContext.Provider value={currentSocket}>
        <VideoChat currentSocket={currentSocket} />
      </SocketContext.Provider>
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
