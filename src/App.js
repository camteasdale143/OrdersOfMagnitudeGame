import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MathGame from './components/MathGame';
import './App.css'; // Import the CSS file

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [minMagnitude, setMinMagnitude] = useState(0); // State for minimum magnitude
  const [maxMagnitude, setMaxMagnitude] = useState(5); // State for maximum magnitude
  const isDarkMode = true

  const startGame = (min, max) => {
    setMinMagnitude(min);
    setMaxMagnitude(max);
    setIsGameStarted(true);
  };

  const endGame = () => {
    setIsGameStarted(false);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> {/* Apply dark-mode class */}
      {isGameStarted ? (
        <MathGame endGame={endGame} minMagnitude={minMagnitude} maxMagnitude={maxMagnitude} />
      ) : (
        <LandingPage startGame={startGame} />
      )}
    </div>
  );
}

export default App;