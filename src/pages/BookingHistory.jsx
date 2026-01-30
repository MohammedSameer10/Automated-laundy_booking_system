import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './BookingHistory.css'

const BookingHistory = () => {
  const bookings = useSelector((state) => state.bookings.bookings)
  const navigate = useNavigate()

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'pending'
      case 'completed':
        return 'completed'
      case 'cancelled':
        return 'cancelled'
      default:
        return 'pending'
    }
  }

  return (
    <div className="history-container">
      <nav className="history-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Booking History</h2>
        <button onClick={() => navigate('/booking')} className="new-booking-button">
          New Booking
        </button>
      </nav>

      <div className="history-content">
        {bookings.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">📋</div>
            <h2>No Bookings Yet</h2>
            <p>Start your first booking to see it here</p>
            <button onClick={() => navigate('/booking')} className="primary-button">
              Book Now
            </button>
          </div>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-card-header">
                  <div>
                    <h3>{booking.serviceType || 'Laundry Service'}</h3>
                    <p className="booking-date">
                      Booked on {new Date(booking.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <span className={`status-badge ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>

                <div className="booking-details">
                  <div className="detail-row">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">{booking.quantity} items</span>
                  </div>
                  {booking.pickupDate && (
                    <div className="detail-row">
                      <span className="detail-label">Pickup Date:</span>
                      <span className="detail-value">
                        {new Date(booking.pickupDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {booking.pickupTime && (
                    <div className="detail-row">
                      <span className="detail-label">Pickup Time:</span>
                      <span className="detail-value">{booking.pickupTime}</span>
                    </div>
                  )}
                  {booking.specialInstructions && (
                    <div className="detail-row">
                      <span className="detail-label">Instructions:</span>
                      <span className="detail-value">{booking.specialInstructions}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookingHistory




