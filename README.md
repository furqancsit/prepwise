
# AI Interview Platform

An AI-powered interview platform that helps users practice interviews
and receive structured feedback on their responses.

## Overview

This project combines a React frontend with a Node.js backend to
provide an interactive interview practice experience.

## Features

- Interactive text-based interviews
- AI-assisted question generation or evaluation
- Structured feedback on user responses
- Interview session management
- 

## Tech Stack

**Frontend**
- React

**Backend**
- Node.js
- Express
- Mongodb
- Gemini AI

## Architecture

- `frontend/` — User interface and client-side application
- `backend/` — API, interview logic, and server-side integrations

## Prerequisites

- Node.js (use a version compatible with the project)
- npm
- Required database and AI provider credentials

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/furqancsit/prepwise.git
cd prepwise
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a local `.env` file using `backend/.env.example`
as a reference. Add your own credentials.

### 4. Start the backend

Run the development command configured in `backend/package.json`.

### 5. Install and start the frontend

Open another terminal:

```bash
cd frontend
npm install
```

Run the development command configured in `frontend/package.json`.

## Configuration

Document the environment variables your application requires.
Never publish real API keys, passwords, or tokens.

## Testing

Document the available test commands and the tests you have
actually implemented.

## Screenshots

Add screenshots of the working application here.

## Future Improvements

- Expand automated test coverage
- Improve accessibility and error handling
- Add further interview analytics

## Author

Furqan
