import express from 'express';
import { 
    getMoviesData, 
    getMovieById, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    searchMovies 
} from '../controller/movieController.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const MovieRouter = express.Router();

// Public routes (specific routes first)
MovieRouter.get('/getAllMovies', getMoviesData);
MovieRouter.get('/search', searchMovies);

// Admin routes (require authentication and admin role)
MovieRouter.post('/', authenticateToken, requireAdmin, addMovie);

// Public routes with parameters (should come after specific routes)
MovieRouter.get('/:id', getMovieById);
MovieRouter.get('/', getMoviesData); // Alternative route

// Admin routes with parameters
MovieRouter.put('/:id', authenticateToken, requireAdmin, updateMovie);
MovieRouter.delete('/:id', authenticateToken, requireAdmin, deleteMovie);

export default MovieRouter;