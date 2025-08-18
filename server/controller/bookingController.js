import { BookingModel } from "../model/bookingModel.js";
import { MovieModel } from "../model/MovieModel.js";
import { UserModel } from "../model/userModel.js";

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const {
            movieId,
            movieTitle,
            userName,
            userEmail,
            userPhone,
            showDate,
            showTime,
            numberOfTickets
        } = req.body;

        const userId = req.user.userId;

        // Validate movie exists
        const movie = await MovieModel.findById(movieId);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        // Calculate total amount
        const ticketPrice = movie.ticketPrice || 12;
        const totalAmount = ticketPrice * numberOfTickets;

        // Create booking
        const newBooking = new BookingModel({
            user: userId,
            movie: movieId,
            movieTitle: movieTitle || movie.title,
            userName,
            userEmail,
            userPhone,
            showDate: new Date(showDate),
            showTime,
            numberOfTickets,
            ticketPrice: ticketPrice,
            totalAmount: totalAmount
        });

        await newBooking.save();

        // Populate movie details
        await newBooking.populate('movie', 'title image genre director');

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating booking",
            error: error.message
        });
    }
};

// Get all bookings (Admin only)
const getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingModel.find()
            .populate('user', 'name email phone')
            .populate('movie', 'title image genre director')
            .sort({ bookingDate: -1 });

        res.status(200).json({
            success: true,
            message: "All bookings fetched successfully",
            data: bookings
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching bookings",
            error: error.message
        });
    }
};

// Get booking by ID
const getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const booking = await BookingModel.findById(id)
            .populate('movie', 'title image genre director')
            .populate('user', 'name email phone');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user owns this booking (unless admin)
        if (booking.user._id.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        res.status(200).json({
            success: true,
            message: "Booking details fetched successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching booking details",
            error: error.message
        });
    }
};

// Cancel booking
const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.userId;

        const booking = await BookingModel.findById(id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        // Check if user owns this booking
        if (booking.user.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Access denied"
            });
        }

        // Check if booking can be cancelled (e.g., not past the show date)
        const showDateTime = new Date(booking.showDate);
        const now = new Date();
        
        if (showDateTime < now) {
            return res.status(400).json({
                success: false,
                message: "Cannot cancel past bookings"
            });
        }

        booking.status = 'cancelled';
        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error cancelling booking",
            error: error.message
        });
    }
};

// Get booking statistics (Admin only)
const getBookingStats = async (req, res) => {
    try {
        const totalBookings = await BookingModel.countDocuments();
        const confirmedBookings = await BookingModel.countDocuments({ status: 'confirmed' });
        const cancelledBookings = await BookingModel.countDocuments({ status: 'cancelled' });
        
        const totalRevenue = await BookingModel.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { _id: null, total: { $sum: '$totalAmount' } } }
        ]);

        const popularMovies = await BookingModel.aggregate([
            { $match: { status: 'confirmed' } },
            { $group: { 
                _id: '$movieTitle', 
                bookings: { $sum: 1 },
                totalTickets: { $sum: '$numberOfTickets' },
                revenue: { $sum: '$totalAmount' }
            }},
            { $sort: { bookings: -1 } },
            { $limit: 5 }
        ]);

        res.status(200).json({
            success: true,
            message: "Booking statistics fetched successfully",
            data: {
                totalBookings,
                confirmedBookings,
                cancelledBookings,
                totalRevenue: totalRevenue[0]?.total || 0,
                popularMovies
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching booking statistics",
            error: error.message
        });
    }
};

export {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    getBookingStats
};
