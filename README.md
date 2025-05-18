# Math Test Web App

A simple web application for testing math skills.

## Project Structure

This project is a React application.

- `public/`: Contains the public assets, including `index.html`.
- `src/`: Contains the main application source code.
  - `src/App.js`: The main application component.
  - `src/index.js`: Entry point of the application.
  - `src/components/`: Contains reusable React components.
    - `src/components/LandingPage.js`: Component for the landing page.
    - `src/components/MathGame.js`: Component for the math game logic and UI.
- `package.json`: Project dependencies and scripts.
- `netlify.toml`: Configuration file for Netlify deployment.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd math-test
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
   or if you use yarn:
   ```bash
   yarn install
   ```

### Running the Application

To run the application in development mode:

```bash
npm start
```
or if you use yarn:
```bash
yarn start
```

This will start the development server and open the application in your default browser at `http://localhost:3000`.

## Deployment

This project includes a `netlify.toml` file for deployment on Netlify.

To build the application for production:

```bash
npm run build
```
or if you use yarn:
```bash
yarn build
```

This command builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

## Built With

*   [React](https://react.dev/) - The web framework used

## Authors

*   **Your Name** - *Initial work* - [YourProfile](link_to_your_profile)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details (if you have one).

## Acknowledgments

*   Hat tip to anyone whose code was used
*   Inspiration
*   etc.