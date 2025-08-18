import React from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
      {/* Movie Image */}
      <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x600/gray/white?text=Movie+Poster'
          }}
        />
      </div>
      
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{movie.title}</h3>
        <p className="text-gray-600 mb-2 text-sm">{movie.genre}</p>
        <p className="text-gray-600 mb-4 text-sm line-clamp-2">{movie.description}</p>
        
        {/* Movie Details */}
        <div className="text-sm text-gray-500 mb-4">
          <p>Duration: {movie.duration}</p>
          <p>Rating: {movie.rating}</p>
          <p className="font-semibold text-green-600">₹{movie.ticketPrice}</p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Link 
            to={`/description/${movie._id}`}
            className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded hover:bg-blue-700 transition duration-200 text-sm font-medium"
          >
            View Details
          </Link>
          <Link 
            to={`/payment/${movie._id}`}
            className="flex-1 bg-red-600 text-white text-center py-2 px-4 rounded hover:bg-red-700 transition duration-200 text-sm font-medium"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
