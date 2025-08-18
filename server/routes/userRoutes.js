import express from 'express';
import { 
    registerUser, 
    loginUser, 
    getUserData, 
    getUserBookings, 
    updateUserProfile 
} from '../controller/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const userRouter = express.Router();

// Public routes
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

// Protected routes (require authentication)
userRouter.get('/profile', authenticateToken, getUserData);
userRouter.get('/getUserData', authenticateToken, getUserData); // Keep legacy route
userRouter.get('/bookings', authenticateToken, getUserBookings);
userRouter.put('/profile', authenticateToken, updateUserProfile);

export default userRouter;