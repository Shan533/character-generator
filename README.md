# Character Generator

A web application for generating and managing character images using AI.

## Features

- Create and manage character profiles
- Generate character images using AI
- Save and organize generated images
- Mark favorite images
- Refine generated images with new prompts

## Tech Stack

- Frontend: React, TypeScript, Tailwind CSS
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- AI Integration: OpenAI DALL-E

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/character-generator.git
cd character-generator
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

4. Start the development servers
```bash
# Start the server (from server directory)
npm run dev

# Start the client (from client directory)
npm run dev
```

## Environment Variables

- `PORT`: Server port (default: 8000)
- `MONGODB_URI`: MongoDB connection string
- `NODE_ENV`: Environment (development/production)
- `OPENAI_API_KEY`: OpenAI API key for image generation
