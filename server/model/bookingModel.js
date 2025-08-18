import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
        required: true
    },
    movieTitle: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPhone: {
        type: String
    },
    showDate: {
        type: Date,
        required: true
    },
    showTime: {
        type: String,
        required: true
    },
    numberOfTickets: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    ticketPrice: {
        type: Number,
        required: true,
        default: 12
    },
    totalAmount: {
        type: Number,
        required: true
    },
    bookingDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['confirmed', 'cancelled', 'pending'],
        default: 'confirmed'
    }
}, {
    timestamps: true
});

// Calculate total amount before saving
bookingSchema.pre('save', function(next) {
    this.totalAmount = this.numberOfTickets * this.ticketPrice;
    next();
});

const BookingModel = mongoose.model('Booking', bookingSchema);

export { BookingModel };
