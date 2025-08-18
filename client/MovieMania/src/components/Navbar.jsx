import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold">
            🎬 Movie Mania
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="hover:text-gray-200 transition duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/description" 
              className="hover:text-gray-200 transition duration-200 font-medium"
            >
              All Movies
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/payment" 
                  className="hover:text-gray-200 transition duration-200 font-medium"
                >
                  Book Tickets
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">
                    Welcome, {user?.name}!
                  </span>
                  <button
                    onClick={logout}
                    className="bg-red-700 hover:bg-red-800 px-3 py-1 rounded text-sm transition duration-200"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login"
                  className="hover:text-gray-200 transition duration-200 font-medium"
                >
                  Login
                </Link>
                <Link 
                  to="/register"
                  className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400 transition duration-200 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
