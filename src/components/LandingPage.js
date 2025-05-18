import React, { useState } from 'react';

function LandingPage({ startGame }) {
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [maxMagnitude, setMaxMagnitude] = useState(9);

  const handleStartGame = () => {
    startGame(minMagnitude, maxMagnitude);
  };

  return (
    <div className="landing-page">
      <h1>Math Test: Orders of Magnitude</h1>
      <p>Test your skills with multiplication and division involving large numbers and powers of ten.</p>

      <div>
        <h3>Select Minimum Order of Magnitude:</h3>
        {[0, 3, 6].map((magnitude) => (
          <label key={magnitude}>
            <input
              type="radio"
              value={magnitude}
              checked={minMagnitude === magnitude}
              onChange={() => setMinMagnitude(magnitude)}
            />
            10^{magnitude}
          </label>
        ))}
      </div>

      <div>
        <h3>Select Maximum Order of Magnitude:</h3>
        {[3, 6, 9].map((magnitude) => (
          <label key={magnitude}>
            <input
              type="radio"
              value={magnitude}
              checked={maxMagnitude === magnitude}
              onChange={() => setMaxMagnitude(magnitude)}
            />
            10^{magnitude}
          </label>
        ))}
      </div>

      <button onClick={handleStartGame}>Begin</button>
    </div>
  );
}

export default LandingPage;