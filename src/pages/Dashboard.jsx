import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Dashboard.css'

const Dashboard = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>🧺 Voice Laundry</h2>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate('/booking')} className="nav-button primary">
            New Booking
          </button>
          <div className="user-menu">
            <span className="user-name">{user?.name || user?.email || 'User'}</span>
            <button onClick={handleLogout} className="nav-button secondary">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Welcome back, {user?.name || 'User'}! 👋</h1>
          <p>Manage your laundry bookings with ease</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>{stats.totalBookings}</h3>
              <p>Total Bookings</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <div className="stat-info">
              <h3>{stats.pendingBookings}</h3>
              <p>Pending</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <h3>{stats.completedBookings}</h3>
              <p>Completed</p>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <div className="action-card" onClick={() => navigate('/booking')}>
            <div className="action-icon">🎤</div>
            <h3>Voice Booking</h3>
            <p>Book your laundry service using voice commands</p>
            <button className="action-button">Start Booking</button>
          </div>

          <div className="action-card">
            <div className="action-icon">📋</div>
            <h3>My Bookings</h3>
            <p>View and manage your booking history</p>
            <button className="action-button">View Bookings</button>
          </div>

          <div className="action-card">
            <div className="action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account and preferences</p>
            <button className="action-button">Settings</button>
          </div>
        </div>

        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <div className="bookings-list">
            <div className="empty-state">
              <p>No bookings yet. Start your first booking!</p>
              <button onClick={() => navigate('/booking')} className="primary-button">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


