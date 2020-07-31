import React, {useEffect, useState} from 'react';
import './App.css';
import VideoChat from './VideoChat';
import SocketContext from './SocketContext'
import socketIOClient from "socket.io-client";

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
        <h1>Master Debater</h1>
      </header>
      <main>
      <SocketContext.Provider value={currentSocket}>
        <VideoChat currentSocket={currentSocket} />
      </SocketContext.Provider>
      </main>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <a href="https://twitter.com/philnash">philnash</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
