import React from 'react';

function LandingPage({ startGame }) {
  return (
    <div>
      <h1>Math Test: Orders of Magnitude</h1>
      <p>Test your skills with multiplication and division involving large numbers and powers of ten.</p>
      <button onClick={startGame}>Begin</button>
    </div>
  );
}

export default LandingPage;