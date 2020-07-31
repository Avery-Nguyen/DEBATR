import React from 'react';
import './App.css';
import VideoChat from './VideoChat';
import ReactDOM from 'react-dom';
import Rating from './components/partials/rating'
import DiscreteSlider from './components/partials/slider'
import './components/partials/slider.css'

const App = () => {
  return (
    <div className="app">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat />
      </main>
      <div>
        <Rating />
      </div>
      <div>
        <DiscreteSlider />
      </div>
      <footer>
        <p>
          Made with{' '}
          <span role="img" aria-label="React">
            ⚛️
          </span>{' '}
          by <a href="">AAA+</a>
        </p>
      </footer>
    </div>
  );
};

export default App;
