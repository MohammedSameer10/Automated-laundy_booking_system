import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../store/slices/userSlice'
import './Dashboard.css'

const Dashboard = () => {
  const { user, profileImage } = useSelector((state) => state.user)
  const bookings = useSelector((state) => state.bookings.bookings)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    // Load user from localStorage if not in Redux
    const storedUser = localStorage.getItem('user')
    const storedImage = localStorage.getItem('profileImage')
    if (storedUser && !user) {
      dispatch({ type: 'user/setUser', payload: JSON.parse(storedUser) })
      if (storedImage) {
        dispatch({ type: 'user/setProfileImage', payload: storedImage })
      }
    }
  }, [user, dispatch])

  const stats = {
    totalBookings: bookings.length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
    completedBookings: bookings.filter(b => b.status === 'completed').length
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('profileImage')
    dispatch(logout())
    navigate('/login')
  }

  const recentBookings = bookings.slice(0, 3)

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
            {profileImage && (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="profile-avatar"
                onClick={() => navigate('/profile')}
              />
            )}
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

          <div className="action-card" onClick={() => navigate('/history')}>
            <div className="action-icon">📋</div>
            <h3>My Bookings</h3>
            <p>View and manage your booking history</p>
            <button className="action-button">View Bookings</button>
          </div>

          <div className="action-card" onClick={() => navigate('/services')}>
            <div className="action-icon">🛍️</div>
            <h3>Our Services</h3>
            <p>Explore all available laundry services</p>
            <button className="action-button">View Services</button>
          </div>

          <div className="action-card" onClick={() => navigate('/settings')}>
            <div className="action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Manage your account and preferences</p>
            <button className="action-button">Settings</button>
          </div>

          <div className="action-card" onClick={() => navigate('/profile')}>
            <div className="action-icon">👤</div>
            <h3>Profile</h3>
            <p>View and edit your profile information</p>
            <button className="action-button">View Profile</button>
          </div>

          <div className="action-card" onClick={() => navigate('/help')}>
            <div className="action-icon">❓</div>
            <h3>Help & Support</h3>
            <p>Get help and contact support</p>
            <button className="action-button">Get Help</button>
          </div>
        </div>

        <div className="recent-bookings">
          <h2>Recent Bookings</h2>
          <div className="bookings-list">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-info">
                    <h4>{booking.serviceType || 'Laundry Service'}</h4>
                    <p>{booking.quantity} items • {new Date(booking.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`booking-status ${booking.status}`}>
                    {booking.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <p>No bookings yet. Start your first booking!</p>
                <button onClick={() => navigate('/booking')} className="primary-button">
                  Book Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
