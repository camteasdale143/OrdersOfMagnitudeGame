import React, { useState, useEffect } from 'react';

var converter = require('number-to-words');


function MathGame({ endGame, minMagnitude, maxMagnitude }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes
  const [isGameActive, setIsGameActive] = useState(true);
  const [correctAnswer, setCorrectAnswer] = useState(null);


  const numberToWords= (num) => {
    let multiplier_map = [
      {"multiplier": 1_000_000_000_000_000, "unit": "Quadrillion"},
      {"multiplier": 1_000_000_000_000, "unit": "Trillion"},
      {"multiplier": 1_000_000_000, "unit": "Billion"},
      {"multiplier": 1_000_000, "unit": "Million"},
      {"multiplier": 1_000, "unit": "K"},
    ]

    let unit = ""

    for (let i=0; i<multiplier_map.length; i++) {
      let m = multiplier_map[i]
      if (num % m["multiplier"] < num) {
        return String(num / m["multiplier"]) + " " + m["unit"]
      }
    }
    return String(num)
  };

  // Function to generate a new question
  const generateQuestion = () => {
    const generateMagnitude = () => {
      const digit = Math.floor(Math.random() * 10) + 1;
      const power = Math.floor(Math.random() * (maxMagnitude - minMagnitude + 1)) + minMagnitude;
      console.log('minMagnitude:', minMagnitude, 'maxMagnitude:', maxMagnitude, 'power:', power);
      const value = digit * Math.pow(10, power);
      console.log('Generated value:', value);
      return { value: value, digit: digit, power: power };
    };

    let val1Obj = generateMagnitude();
    let val2Obj = generateMagnitude();
    const operator = Math.random() < 0.5 ? '*' : '/';

    let questionString;
    let calculatedAnswer;

    if (operator === '*') {
      questionString = `${numberToWords(val1Obj.value)} * ${numberToWords(val2Obj.value)}`;
      calculatedAnswer = val1Obj.value * val2Obj.value;
    } else {
      // Ensure division results in a whole number and manageable magnitude
      // Generate a result magnitude first, then calculate the dividend
      const resultPower = Math.floor(Math.random() * (maxMagnitude - minMagnitude + 1)) + minMagnitude;
      const resultDigit = Math.floor(Math.random() * 9) + 1;
      calculatedAnswer = resultDigit * Math.pow(10, resultPower);

      // Calculate the dividend based on the divisor and the desired result
      let dividend = val2Obj.value * calculatedAnswer;

      console.log(dividend)
      console.log(val2Obj.value)

      questionString = `${numberToWords(dividend)} / ${numberToWords(val2Obj.value)}`;
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
  const parseMagnitudeInput = (input) => {
    // Remove leading/trailing spaces and convert to lowercase for easier parsing
    const cleanedInput = input.trim().toLowerCase();

    // Regex to match number followed by optional space and magnitude suffix (m, b, t, q)
    const match = cleanedInput.match(/^(\d+(\.\d+)?)\s*([kmbtq])?$/);

    if (!match) {
      // If no match, try converting directly to a number (for inputs without suffixes)
      const num = Number(cleanedInput);
      return isNaN(num) ? NaN : num;
    }

    const numberPart = parseFloat(match[1]);
    const suffix = match[3]; // m, b, t, or q

    if (isNaN(numberPart)) {
      return NaN; // Should not happen with the regex, but good practice
    }

    let multiplier = 1;
    switch (suffix) {
      case 'k':
        multiplier = 1_000;
        break;
      case 'm':
        multiplier = 1_000_000;
        break;
      case 'b':
        multiplier = 1_000_000_000;
        break;
      case 't':
        multiplier = 1_000_000_000_000;
        break;
      case 'q': // Assuming 'q' for quadrillion
        multiplier = 1_000_000_000_000_000;
        break;
      default:
        // No suffix, use the number part directly
        return numberPart;
    }

    console.log(multiplier)
    console.log(numberPart)

    return numberPart * multiplier;
  };

  // Check answer
  const checkAnswer = () => {
    // Convert user input to a number for comparison using the new parser
    const userAnswerNum = parseMagnitudeInput(answer);

    // Allow for a small tolerance in case of floating point inaccuracies,
    // especially with large numbers or division results.
    // A tolerance of 1 is used here, assuming whole number answers.
    const tolerance = 1;

    if (!isNaN(userAnswerNum) && Math.abs(userAnswerNum - correctAnswer) < tolerance) {
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
        <p>Tip: Use Magnitude suffixes: k (thousand), m (million), b (billion), t (trillion)</p>
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