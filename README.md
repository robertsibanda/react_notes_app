# React Notes App

A simple notes application built with React.

## Prerequisites

- Node.js 14+
- npm

## Setup

1. Clone the repository:
   ```
   git clone <repo-url>
   cd react-notes-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure the API URL (optional):
   Create a `.env` file in the project root:
   ```
   REACT_APP_API_URL=http://localhost:8000/api
   ```
   Defaults to `http://localhost:8000/api` if not set.

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner

## Backend

This app requires a Django REST Framework backend running at the configured API URL. The backend should provide endpoints for:

- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `GET /api` - List notes
- `GET /api/note/:id` - Get a single note
- `PUT /api/update/:id` - Update a note
- `DELETE /api/delete/:id` - Delete a note
