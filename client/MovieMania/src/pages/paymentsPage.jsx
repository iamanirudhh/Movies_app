import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { movieAPI, bookingAPI } from '../services/apiService'
import { useAuth } from '../context/AuthContext'

const PaymentsPage = () => {
  const { movieId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [selectedMovieData, setSelectedMovieData] = useState(null)
  const [allMovies, setAllMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [formData, setFormData] = useState({
    movie: '',
    date: '',
    time: '',
    tickets: 1,
    name: '',
    email: '',
    phone: ''
  })

  const [showSuccess, setShowSuccess] = useState(false)
  const [bookingDetails, setBookingDetails] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    const fetchMovies = async () => {
      try {
        const response = await movieAPI.getAllMovies()
        if (response.success) {
          setAllMovies(response.data)
          
          let selectedMovie
          if (movieId) {
            selectedMovie = response.data.find(m => m._id === movieId)
          }
          
          if (!selectedMovie) {
            selectedMovie = response.data[0]
          }
          
          if (selectedMovie) {
            setSelectedMovieData(selectedMovie)
            setFormData(prev => ({
              ...prev,
              movie: selectedMovie._id,
              time: selectedMovie.showtimes?.[0] || '7:00 PM',
              name: user?.name || '',
              email: user?.email || '',
              phone: user?.phone || ''
            }))
          }
        }
      } catch (err) {
        console.error('Error fetching movies:', err)
        setError('Failed to load movies')
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [movieId, isAuthenticated, user, navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // If movie selection changes, update selected movie data
    if (name === 'movie') {
      const movie = allMovies.find(m => m._id === value)
      setSelectedMovieData(movie)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setBookingLoading(true)
    setError('')

    // Simple form validation
    if (!formData.name || !formData.email || !formData.date || !formData.movie) {
      setError('Please fill in all required fields')
      setBookingLoading(false)
      return
    }

    try {
      const bookingData = {
        movieId: formData.movie,
        movieTitle: selectedMovieData?.title,
        userName: formData.name,
        userEmail: formData.email,
        userPhone: formData.phone,
        showDate: formData.date,
        showTime: formData.time,
        numberOfTickets: parseInt(formData.tickets)
      }

      const response = await bookingAPI.createBooking(bookingData)
      
      if (response.success) {
        setBookingDetails(response.data)
        setShowSuccess(true)
      } else {
        setError(response.message || 'Booking failed')
      }
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.message || 'Failed to create booking')
    } finally {
      setBookingLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (showSuccess && bookingDetails) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-6">
            Your tickets for <strong>{bookingDetails.movieTitle}</strong> have been booked successfully!
          </p>
          <div className="bg-gray-100 p-4 rounded mb-6 text-left">
            <p><strong>Booking ID:</strong> {bookingDetails._id}</p>
            <p><strong>Movie:</strong> {bookingDetails.movieTitle}</p>
            <p><strong>Date:</strong> {new Date(bookingDetails.showDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {bookingDetails.showTime}</p>
            <p><strong>Tickets:</strong> {bookingDetails.numberOfTickets}</p>
            <p><strong>Total:</strong> ₹{bookingDetails.totalAmount}</p>
          </div>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Book Your Tickets</h1>
          
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {/* Movie Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Movie *
                </label>
                <select
                  name="movie"
                  value={formData.movie}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {allMovies.map(movie => (
                    <option key={movie._id} value={movie._id}>{movie.title}</option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Time Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Show Time *
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  {selectedMovieData?.showtimes?.map(time => (
                    <option key={time} value={time}>{time}</option>
                  )) || (
                    <>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                    </>
                  )}
                </select>
              </div>

              {/* Number of Tickets */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  name="tickets"
                  value={formData.tickets}
                  onChange={handleInputChange}
                  min="1"
                  max="10"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Personal Information */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Total Price */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-600">
                    ₹{formData.tickets * (selectedMovieData?.ticketPrice || 12)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.tickets} ticket(s) × ₹{selectedMovieData?.ticketPrice || 12} each
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 transition duration-200 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bookingLoading ? 'Processing...' : 'Book Tickets'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsPage
