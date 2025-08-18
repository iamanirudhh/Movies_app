import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/landingPage'
import DescriptinPage from './pages/descriptinPage'
import PaymentsPage from './pages/paymentsPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/description/:movieId" element={<DescriptinPage />} />
            <Route path="/payment/:movieId" element={<PaymentsPage />} />
            {/* Fallback routes without IDs */}
            <Route path="/description" element={<DescriptinPage />} />
            <Route path="/payment" element={<PaymentsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
