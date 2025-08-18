import API from './api.js';

// Auth API calls
export const authAPI = {
  // Register new user
  register: async (userData) => {
    return await API.post('/user/register', userData);
  },

  // Login user
  login: async (credentials) => {
    return await API.post('/user/login', credentials);
  },

  // Get user profile
  getProfile: async () => {
    return await API.get('/user/profile');
  },

  // Update user profile
  updateProfile: async (userData) => {
    return await API.put('/user/profile', userData);
  },

  // Get user bookings
  getUserBookings: async () => {
    return await API.get('/user/bookings');
  },
};

// Movie API calls
export const movieAPI = {
  // Get all movies
  getAllMovies: async () => {
    return await API.get('/movies/getAllMovies');
  },

  // Get movie by ID
  getMovieById: async (id) => {
    return await API.get(`/movies/${id}`);
  },

  // Search movies
  searchMovies: async (query) => {
    return await API.get(`/movies/search?query=${encodeURIComponent(query)}`);
  },

  // Admin: Add new movie
  addMovie: async (movieData) => {
    return await API.post('/movies', movieData);
  },

  // Admin: Update movie
  updateMovie: async (id, movieData) => {
    return await API.put(`/movies/${id}`, movieData);
  },

  // Admin: Delete movie
  deleteMovie: async (id) => {
    return await API.delete(`/movies/${id}`);
  },
};

// Booking API calls
export const bookingAPI = {
  // Create new booking
  createBooking: async (bookingData) => {
    return await API.post('/bookings', bookingData);
  },

  // Get booking by ID
  getBookingById: async (id) => {
    return await API.get(`/bookings/${id}`);
  },

  // Cancel booking
  cancelBooking: async (id) => {
    return await API.put(`/bookings/${id}/cancel`);
  },

  // Admin: Get all bookings
  getAllBookings: async () => {
    return await API.get('/bookings/all');
  },

  // Admin: Get booking statistics
  getBookingStats: async () => {
    return await API.get('/bookings/stats/overview');
  },
};
