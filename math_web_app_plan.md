# React Math Web App Plan

This document outlines the plan for creating a React web application that provides a timed math game focused on orders of magnitude.

## Objective

Create a web application where users can solve randomly generated math questions involving multiplication and division by powers of ten within a 2-minute time limit. The application will track the user's score and provide an option to play again.

## Plan

1.  **Project Setup:**
    *   Create the necessary files for a basic React application structure (`public/index.html`, `src/index.js`, `src/App.js`).
    *   Set up the initial rendering in `src/index.js` to render the main `App` component into the HTML.
    *   Implement basic state management in `src/App.js` to control whether the landing page or the game is displayed.

2.  **Landing Page Component (`src/components/LandingPage.js`):**
    *   Create a new React component for the landing page.
    *   This component will display a title and a brief description of the game.
    *   Include a button labeled "Begin".
    *   When the "Begin" button is clicked, it will trigger a state change in the parent `App` component to switch to the game view.

3.  **Math Game Component (`src/components/MathGame.js`):**
    *   Create a new React component to handle the game logic and UI.
    *   **State Management:** This component will manage the current math question, the user's input, the remaining time, the current score, and the game's active state.
    *   **Question Generation:** Implement a function to generate random math questions. These questions will involve multiplication or division of numbers with a single non-zero digit and powers of ten (e.g., 4 Billion / 2 Hundred Thousand). The function should calculate the correct numerical answer.
    *   **Timer:** Implement a countdown timer for 2 minutes (120 seconds). Display the remaining time to the user. When the timer reaches zero, the game should end.
    *   **Scoring:** Initialize the score to zero. Increment the score each time the user provides a correct answer. Display the current score during the game and the final score at the end.
    *   **Input and Answer Checking:** Provide a text input field for the user to type their answer. Add an event handler to check the user's input against the correct answer for the current question. If the answer is correct, update the score, generate a new question, and clear the input field. If incorrect, the question remains, and the input is not cleared automatically.
    *   **Game End:** When the timer expires, disable the input field to prevent further answers. Display the final score prominently.
    *   **"Try Again" Functionality:** Display a "Try Again" button after the game ends. Clicking this button will reset the game state (timer, score, current question) and start a new game.

4.  **Integration in `src/App.js`:**
    *   Import the `LandingPage` and `MathGame` components.
    *   Use conditional rendering based on the application state (e.g., `isGameStarted`) to show either the `LandingPage` or the `MathGame`.
    *   Pass down necessary props (like a function to start the game) from `App` to the child components.

5.  **Styling:**
    *   Add basic CSS (either inline, in component-specific files, or a global stylesheet) to style the components and layout.

## Component Flow

```mermaid
graph TD
    A[src/index.js] --> B[src/App.js];
    B -- Renders based on state --> C{Game Started?};
    C -- No --> D[src/components/LandingPage.js];
    C -- Yes --> E[src/components/MathGame.js];
    D -- "Begin" Click --> B;
    E -- Timer Ends --> E;
    E -- "Try Again" Click --> B;