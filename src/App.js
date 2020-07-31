import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import ReactDOM from 'react-dom';
import Stage from './components/stage/stage';
// import Rating from './components/partials/rating'
// import DiscreteSlider from './components/partials/slider'
import UserCard from './components/user-card/userCard'
        
import Lobby from './components/lobby/lobby'

import './components/partials/slider.css'

{/* <VideoChat /> */}

const App = () => {
  return (
    <div className="app">
      <header>
        <h1 style={{backgroundColor: "black"}}>Debatr</h1>
      </header>
      <main>
      <Stage />
      </main>
      <footer>
        <p>
          Made with{' '}
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
