// import mongoose from 'mongoose';

// const Schema = mongoose.Schema;

// const movieSchema = new Schema({
//     title: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     description: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: String,
//         default: '8.0/10'
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     genre: {
//         type: String,
//         required: true
//     },
//     cast: {
//         type: String,
//         required: true
//     },
//     director: {
//         type: String,
//         required: true
//     },
//     duration: {
//         type: String,
//         required: true
//     },
//     language: {
//         type: String,
//         default: 'English'
//     },
//     releaseDate: {
//         type: Date
//     },
//     ticketPrice: {
//         type: Number,
//         default: 12
//     },
//     showtimes: [{
//         type: String
//     }],
//     isActive: {
//         type: Boolean,
//         default: true
//     }
// }, {
//     timestamps: true
// });

// // Index for faster searches
// movieSchema.index({ title: 1, genre: 1 });

// const MovieModel = mongoose.model('Movie', movieSchema);

// export { MovieModel };