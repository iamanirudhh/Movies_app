import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { movieAPI } from '../services/apiService'

const DescriptinPage = () => {
  const { movieId } = useParams()
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [allMovies, setAllMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await movieAPI.getAllMovies()
        if (response.success) {
          setAllMovies(response.data)
          
          if (movieId) {
            const movie = response.data.find(m => m._id === movieId)
            setSelectedMovie(movie || response.data[0])
          } else {
            setSelectedMovie(response.data[0])
          }
        } else {
          setError('Failed to fetch movies')
        }
      } catch (err) {
        console.error('Error fetching movies:', err)
        setError('Failed to connect to server')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [movieId])

  const handleMovieChange = (e) => {
    const movie = allMovies.find(m => m._id === e.target.value)
    setSelectedMovie(movie)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  if (!selectedMovie) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Movie not found</p>
          <Link to="/" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Movie Details</h1>
        
        {/* Movie Selection */}
        <div className="flex justify-center mb-8">
          <select 
            value={selectedMovie._id}
            onChange={handleMovieChange}
            className="px-4 py-2 border border-gray-300 rounded-lg text-lg"
          >
            {allMovies.map((movie) => (
              <option key={movie._id} value={movie._id}>
                {movie.title}
              </option>
            ))}
          </select>
        </div>

        {/* Movie Details Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Movie Poster */}
            <div className="md:w-1/3 bg-gray-300 h-96 flex items-center justify-center">
              <img 
                src={selectedMovie.image} 
                alt={selectedMovie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x600/gray/white?text=Movie+Poster'
                }}
              />
            </div>
            
            {/* Movie Info */}
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{selectedMovie.title}</h2>
              
              <div className="space-y-3 mb-6">
                <p><span className="font-semibold">Genre:</span> {selectedMovie.genre}</p>
                <p><span className="font-semibold">Duration:</span> {selectedMovie.duration}</p>
                <p><span className="font-semibold">Rating:</span> {selectedMovie.rating}</p>
                <p><span className="font-semibold">Director:</span> {selectedMovie.director}</p>
                <p><span className="font-semibold">Cast:</span> {selectedMovie.cast}</p>
                <p><span className="font-semibold">Language:</span> {selectedMovie.language}</p>
                <p><span className="font-semibold">Ticket Price:</span> ₹{selectedMovie.ticketPrice}</p>
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Description:</h3>
                <p className="text-gray-700 leading-relaxed">{selectedMovie.description}</p>
              </div>

              {/* Show Times */}
              {selectedMovie.showtimes && selectedMovie.showtimes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-lg mb-2">Show Times:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedMovie.showtimes.map((time, index) => (
                      <span key={index} className="bg-gray-200 px-3 py-1 rounded text-sm">
                        {time}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <Link 
                to={`/payment/${selectedMovie._id}`}
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition duration-200"
              >
                Book Tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DescriptinPage
