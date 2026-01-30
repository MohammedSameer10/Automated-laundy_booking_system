import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Help.css'

const Help = () => {
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)

  const faqs = [
    {
      id: 1,
      question: 'How do I book a laundry service?',
      answer: 'You can book a service through our voice assistant or by filling out the booking form. Simply navigate to the Booking page and either speak your requirements or type them in the chat.'
    },
    {
      id: 2,
      question: 'What services do you offer?',
      answer: 'We offer Wash & Fold, Dry Clean, Ironing, Bulk Laundry, Express Service, and Specialty Items handling. Check out our Services page for more details.'
    },
    {
      id: 3,
      question: 'How long does it take?',
      answer: 'Standard service takes 24-48 hours. Express service is available with 2-hour turnaround for urgent needs.'
    },
    {
      id: 4,
      question: 'Do you offer pickup and delivery?',
      answer: 'Yes! We offer convenient pickup and delivery services. You can schedule your preferred pickup date and time during booking.'
    },
    {
      id: 5,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards, debit cards, and digital payment methods. Payment is processed securely after service completion.'
    },
    {
      id: 6,
      question: 'Can I cancel or modify my booking?',
      answer: 'Yes, you can cancel or modify your booking up to 2 hours before the scheduled pickup time through your Booking History page.'
    }
  ]

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email Support',
      info: 'support@voicelaundry.com',
      action: 'Send Email'
    },
    {
      icon: '📞',
      title: 'Phone Support',
      info: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: '💬',
      title: 'Live Chat',
      info: 'Available 24/7',
      action: 'Start Chat'
    }
  ]

  return (
    <div className="help-container">
      <nav className="help-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Help & Support</h2>
        <div></div>
      </nav>

      <div className="help-content">
        <div className="help-header">
          <h1>How can we help you?</h1>
          <p>Find answers to common questions or contact our support team</p>
        </div>

        <div className="help-sections">
          <div className="faq-section">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {faqs.map((faq) => (
                <div key={faq.id} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setActiveFaq(activeFaq === faq.id ? null : faq.id)}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon">{activeFaq === faq.id ? '−' : '+'}</span>
                  </button>
                  {activeFaq === faq.id && (
                    <div className="faq-answer">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="contact-section">
            <h2>Contact Support</h2>
            <div className="contact-methods">
              {contactMethods.map((method, index) => (
                <div key={index} className="contact-card">
                  <div className="contact-icon">{method.icon}</div>
                  <h3>{method.title}</h3>
                  <p>{method.info}</p>
                  <button className="contact-button">{method.action}</button>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-links-section">
            <h2>Quick Links</h2>
            <div className="quick-links">
              <button onClick={() => navigate('/booking')} className="quick-link-button">
                🎤 Book a Service
              </button>
              <button onClick={() => navigate('/history')} className="quick-link-button">
                📋 View Bookings
              </button>
              <button onClick={() => navigate('/services')} className="quick-link-button">
                🛍️ Our Services
              </button>
              <button onClick={() => navigate('/profile')} className="quick-link-button">
                👤 My Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Help




