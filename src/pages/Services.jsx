import { useNavigate } from 'react-router-dom'
import './Services.css'

const Services = () => {
  const navigate = useNavigate()

  const services = [
    {
      id: 1,
      name: 'Wash & Fold',
      icon: '🧺',
      description: 'Professional washing and folding service for your everyday laundry needs.',
      price: 'Starting at $15',
      features: ['Same-day service', 'Eco-friendly detergents', 'Professional folding']
    },
    {
      id: 2,
      name: 'Dry Clean',
      icon: '👔',
      description: 'Expert dry cleaning for delicate and formal garments.',
      price: 'Starting at $8 per item',
      features: ['Delicate handling', 'Stain removal', 'Professional pressing']
    },
    {
      id: 3,
      name: 'Ironing',
      icon: '🔥',
      description: 'Professional ironing service for crisp, wrinkle-free clothes.',
      price: 'Starting at $5 per item',
      features: ['Steam ironing', 'Quick turnaround', 'Professional finish']
    },
    {
      id: 4,
      name: 'Bulk Laundry',
      icon: '📦',
      description: 'Special rates for large quantities of laundry.',
      price: 'Custom pricing',
      features: ['Volume discounts', 'Scheduled pickups', 'Bulk processing']
    },
    {
      id: 5,
      name: 'Express Service',
      icon: '⚡',
      description: 'Fast-track service for urgent laundry needs.',
      price: 'Premium pricing',
      features: ['2-hour turnaround', 'Priority processing', 'Rush delivery']
    },
    {
      id: 6,
      name: 'Specialty Items',
      icon: '✨',
      description: 'Careful handling of specialty items like curtains, rugs, and more.',
      price: 'Custom pricing',
      features: ['Specialized care', 'Expert handling', 'Custom solutions']
    }
  ]

  return (
    <div className="services-container">
      <nav className="services-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Our Services</h2>
        <button onClick={() => navigate('/booking')} className="book-now-button">
          Book Now
        </button>
      </nav>

      <div className="services-content">
        <div className="services-header">
          <h1>Professional Laundry Services</h1>
          <p>Choose from our wide range of professional laundry services</p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-price">{service.price}</div>
              <ul className="service-features">
                {service.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
              <button 
                onClick={() => navigate('/booking')}
                className="service-button"
              >
                Book This Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Services




