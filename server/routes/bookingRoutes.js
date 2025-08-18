import express from 'express';
import { 
    createBooking, 
    getAllBookings, 
    getBookingById, 
    cancelBooking, 
    getBookingStats 
} from '../controller/bookingController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const bookingRouter = express.Router();

// Admin routes (should come before parameterized routes)
bookingRouter.get('/stats/overview', authenticateToken, requireAdmin, getBookingStats);
bookingRouter.get('/all', authenticateToken, requireAdmin, getAllBookings);

// Protected routes (require authentication)
bookingRouter.post('/', authenticateToken, createBooking);
bookingRouter.get('/:id', authenticateToken, getBookingById);
bookingRouter.put('/:id/cancel', authenticateToken, cancelBooking);

export default bookingRouter;
