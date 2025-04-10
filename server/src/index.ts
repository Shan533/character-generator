import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import characterRoutes from './routes/character.routes';
import imageRoutes from './routes/image.routes';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const PORT = parseInt(process.env.PORT || '8000', 10);

// Middleware
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',  // Vite default dev server port
    'https://shan533.github.io',
    'https://shan533.github.io/character-generator',
    'https://character-generator-y9jf.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
console.log('Connecting to MongoDB...');

mongoose
  .connect(process.env.MONGO_URI || 'mongodb://localhost:27017/character-generator', mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    // Start server
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    // Start server anyway so the frontend can at least load
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT} (without MongoDB connection)`);
    });
  });

export default app; 