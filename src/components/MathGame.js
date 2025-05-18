import React, { useState, useEffect } from 'react';

function MathGame({ endGame }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [isGameActive, setIsGameActive] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState(null);

  // Function to generate a new question
  const generateQuestion = () => {
    const generateMagnitude = () => {
      const digit = Math.floor(Math.random() * 9) + 1;
      const power = Math.floor(Math.random() * 12); // Powers up to 10^11 (Trillions)
      return { value: digit * Math.pow(10, power), digit: digit, power: power };
    };

    let val1Obj = generateMagnitude();
    let val2Obj = generateMagnitude();
    const operator = Math.random() < 0.5 ? '*' : '/';

    let questionString;
    let calculatedAnswer;

    if (operator === '*') {
      questionString = `${val1Obj.value} * ${val2Obj.value}`;
      calculatedAnswer = val1Obj.value * val2Obj.value;
    } else {
      // Ensure division results in a whole number
      // Make the first number a multiple of the second number's base digit and power of 10
      const resultPower = Math.floor(Math.random() * 10); // Result power up to 10^9
      const resultDigit = Math.floor(Math.random() * 9) + 1;
      calculatedAnswer = resultDigit * Math.pow(10, resultPower);

      // To get a whole number result, the dividend must be the product of the divisor and the desired result
      const dividend = val2Obj.value * calculatedAnswer;
      questionString = `${dividend} / ${val2Obj.value}`;
    }

    setQuestion(questionString);
    setCorrectAnswer(calculatedAnswer);
    setAnswer(''); // Clear input for new question
  };

  // Timer effect
  useEffect(() => {
    if (isGameActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      setIsGameActive(false);
      // TODO: Display final score and "Try Again" button
    }
  }, [timeRemaining, isGameActive]);

  // Start game and generate first question on mount
  useEffect(() => {
    generateQuestion();
  }, []);

  // Handle user input
  const handleInputChange = (event) => {
    setAnswer(event.target.value);
  };

  // Check answer
  const checkAnswer = () => {
    // Convert user input to a number for comparison
    const userAnswerNum = Number(answer);

    if (!isNaN(userAnswerNum) && userAnswerNum === correctAnswer) {
      setScore(score + 1);
      generateQuestion(); // Generate new question on correct answer
    }
    // Input is cleared in generateQuestion
  };

  // Handle "Try Again"
  const handleTryAgain = () => {
    setScore(0);
    setTimeRemaining(120);
    setIsGameActive(true);
    generateQuestion();
  };

  return (
    <div>
      {isGameActive ? (
        <div>
          <h2>Time Remaining: {timeRemaining}s</h2>
          <h2>Score: {score}</h2>
          <h3>Question: {question}</h3>
          <input
            type="text"
            value={answer}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === 'Enter') {
                checkAnswer();
              }
            }}
            disabled={!isGameActive}
          />
          <button onClick={checkAnswer} disabled={!isGameActive}>Submit Answer</button>
        </div>
      ) : (
        <div>
          <h2>Game Over!</h2>
          <h3>Your final score is: {score}</h3>
          <button onClick={handleTryAgain}>Try Again</button>
        </div>
      )}
    </div>
  );
}

export default MathGame;