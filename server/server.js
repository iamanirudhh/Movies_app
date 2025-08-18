import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRouter from "./routes/userRoutes.js";
import MovieRouter from './routes/movieRoutes.js';
import bookingRouter from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173' ,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use("/api/user", userRouter);
app.use("/api/movies", MovieRouter);
app.use("/api/bookings", bookingRouter);

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Mania API is running!',
    version: '1.0.0',
    endpoints: {
      users: '/api/user',
      movies: '/api/movies',
      bookings: '/api/bookings'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

app.listen(port, () => {
  console.log(`Movie Mania Server listening on port ${port}`);
  console.log(`API Documentation available at http://localhost:${port}`);
});
