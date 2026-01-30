import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Booking from './pages/Booking'
import Profile from './pages/Profile'
import BookingHistory from './pages/BookingHistory'
import Settings from './pages/Settings'
import Services from './pages/Services'
import Help from './pages/Help'
import './App.css'

function App() {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/booking" 
          element={
            isAuthenticated ? <Booking /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/profile" 
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/history" 
          element={
            isAuthenticated ? <BookingHistory /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? <Settings /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/services" 
          element={
            isAuthenticated ? <Services /> : <Navigate to="/login" />
          } 
        />
        <Route 
          path="/help" 
          element={
            isAuthenticated ? <Help /> : <Navigate to="/login" />
          } 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  )
}

export default App


