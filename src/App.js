import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MathGame from './components/MathGame';

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const startGame = () => {
    setIsGameStarted(true);
  };

  const endGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className="App">
      {isGameStarted ? (
        <MathGame endGame={endGame} />
      ) : (
        <LandingPage startGame={startGame} />
      )}
    </div>
  );
}

export default App;