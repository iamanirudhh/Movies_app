

import { MovieModel } from "../model/movieAppModel.js";

// Get all movies
const getMoviesData = async (req, res) => {
    try {
        const movies = await MovieModel.find({ isActive: true });
        
        res.status(200).json({
            success: true,
            message: "Movies data fetched successfully",
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching movies data",
            error: error.message
        });
    }
};

// Get single movie by ID
const getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        
        const movie = await MovieModel.findById(id);
        if (!movie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie data fetched successfully",
            data: movie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching movie data",
            error: error.message
        });
    }
};

// Add new movie (Admin only)
const addMovie = async (req, res) => {
    try {
        const movieData = req.body;
        
        // Set default showtimes if not provided
        if (!movieData.showtimes || movieData.showtimes.length === 0) {
            movieData.showtimes = ['12:00 PM', '3:00 PM', '7:00 PM', '10:00 PM'];
        }

        const newMovie = new MovieModel(movieData);
        await newMovie.save();

        res.status(201).json({
            success: true,
            message: "Movie added successfully",
            data: newMovie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error adding movie",
            error: error.message
        });
    }
};

// Update movie (Admin only)
const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const updatedMovie = await MovieModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedMovie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie updated successfully",
            data: updatedMovie
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating movie",
            error: error.message
        });
    }
};

// Delete movie (Admin only)
const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedMovie = await MovieModel.findByIdAndUpdate(
            id,
            { isActive: false },
            { new: true }
        );

        if (!deletedMovie) {
            return res.status(404).json({
                success: false,
                message: "Movie not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Movie deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting movie",
            error: error.message
        });
    }
};

// Search movies by title or genre
const searchMovies = async (req, res) => {
    try {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Search query is required"
            });
        }

        const movies = await MovieModel.find({
            isActive: true,
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json({
            success: true,
            message: "Search results fetched successfully",
            data: movies
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error searching movies",
            error: error.message
        });
    }
};

export {
    getMoviesData,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    searchMovies
};