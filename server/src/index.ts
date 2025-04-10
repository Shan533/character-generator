import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import characterRoutes from './routes/character.routes';
import imageRoutes from './routes/image.routes';

// Load environment variables
console.log('Loading environment variables...');
dotenv.config();

// Debug environment variables
console.log('Environment variables loaded:');
console.log(`- PORT: ${process.env.PORT || '(not set)'}`);
console.log(`- NODE_ENV: ${process.env.NODE_ENV || '(not set)'}`);
console.log(`- MONGO_URI: ${process.env.MONGO_URI ? 'Set (hidden for security)' : '(not set)'}`);
console.log(`- OPENAI_API_KEY: ${process.env.OPENAI_API_KEY ? 'Set (hidden for security)' : '(not set)'}`);

// Check if .env file exists
const envPath = path.resolve(process.cwd(), '.env');
console.log(`.env file path: ${envPath}`);
console.log(`.env file exists: ${fs.existsSync(envPath) ? 'Yes' : 'No'}`);

if (fs.existsSync(envPath)) {
  console.log('.env file contents (first few characters of each line):');
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim()) {
      const [key, value] = line.split('=');
      if (key && value) {
        console.log(`- ${key.trim()}: ${value.substring(0, 10)}...`);
      }
    }
  });
}

// Create Express app
const app = express();
const PORT = parseInt(process.env.PORT || '8000', 10);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://shan533.github.io',
    'https://character-generator-y9jf.onrender.com'
  ],
  credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/images', imageRoutes);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Character Image Generator API is running');
});

// MongoDB connection options
const mongoOptions = {
  serverSelectionTimeoutMS: 5000,  // Timeout for server selection
  socketTimeoutMS: 45000,          // How long the MongoDB driver will wait before timing out
  family: 4                        // Use IPv4, skip trying IPv6
};

// Connect to MongoDB
console.log('Connecting to MongoDB Atlas...');
console.log(`URI: ${process.env.MONGO_URI ? process.env.MONGO_URI.substring(0, 20) + '...' : 'Not set'}`);

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/character-generator', mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API accessible at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    console.error('Error details:', error.message);
    // Start server anyway so the frontend can at least load
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} (without MongoDB connection)`);
      console.log(`API accessible at http://localhost:${PORT}`);
    });
  });

export default app; 