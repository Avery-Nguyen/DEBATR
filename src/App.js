import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import ReactDOM from 'react-dom';
import Stage from './components/stage/stage';
import NavBar from './components/nav/nav'
import SignUp from './components/sign-up/signUp'
import PostDebateReview from './components/post-debate/postDebate'
import SignIn from './components/sign-in/signIn'
import CreateRoom from './components/create-room/createRoom'
        
import Lobby from './components/lobby/lobby'
// import UserRating from './components/partials/staticRating'
import UserRating from './components/partials/controlledRating'
import DiscreteSlider from './components/partials/slider'
import UserCard from './components/user-card/userCard'



import './components/partials/slider.css'

{/* <VideoChat /> */}

const App = () => {
  return (
    <div className="app">
        <NavBar />
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
