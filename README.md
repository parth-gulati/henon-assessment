
# Event Planner Application

## Overview

This is an Event Planner application that allows users to manage events with start and end dates. Users can view events in a list format or visualize them on a timeline. The application is built with React for the frontend and Python Flask for the backend.

---

## Features

### Event Creation:
- Users can create new events with the following details:
  - **Title** (string, cannot be empty)
  - **Start Date** (date value)
  - **End Date** (date value)
  - **Type** (dropdown on the frontend with options like “Merger,” “Dividends,” “New Capital,” “Hire”)

### Event List View:
- Displays a list of events with key information such as:
  - Title
  - Start Date
  - End Date
  - Type
- Options to edit and delete events.

### Event Timeline View:
- Visualize events on a timeline, representing their start and end dates.
- Differentiate between events using colors or other visual cues.

---

## Setup

### Running the Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```

   This will start the frontend on a local development server, typically accessible at `http://localhost:3000`.

### Running the Backend

1. Navigate to the `server` directory:
   ```bash
   cd server
   ```

2. Install the required Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend application:
   ```bash
   ./run
   ```

   This will start the backend server locally on the configured port, typically accessible at `http://localhost:5000`.

---

## Future Scope

- The application is currently set up as a monorepo for rapid development. However, for future scalability, the frontend and backend will likely be separated into different repositories.
- Frontend deployments will likely use platforms like Vercel, while backend deployments will use platforms like Heroku, Render, or Fly.io.

---

## Conclusion

This Event Planner application demonstrates the ability to manage, visualize, and interact with events using a modern stack of React and Flask. Future enhancements will focus on separating the codebase into more scalable structures and deploying on different platforms.

