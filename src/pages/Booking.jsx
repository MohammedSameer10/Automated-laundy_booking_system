import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addBooking } from '../store/slices/bookingsSlice'
import './Booking.css'

const Booking = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [chatInput, setChatInput] = useState('')
  const [activeTab, setActiveTab] = useState('voice') // 'voice' or 'text'
  const [bookingDetails, setBookingDetails] = useState({
    serviceType: '',
    quantity: '',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: ''
  })
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I\'m your assistant. You can use voice commands or type your message. How can I help you book a laundry service today?' }
  ])
  const [isProcessing, setIsProcessing] = useState(false)
  const recognitionRef = useRef(null)
  const chatEndRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        setTranscript(finalTranscript || interimTranscript)
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
        addMessage('bot', 'Sorry, I encountered an error. Please try again.')
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          try {
            recognitionRef.current.start()
          } catch (e) {
            setIsListening(false)
          }
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isListening])

  const addMessage = (type, text) => {
    setMessages(prev => [...prev, { type, text, timestamp: new Date() }])
  }

  const processCommand = (command) => {
    const lowerCommand = command.toLowerCase()
    setIsProcessing(true)

    setTimeout(() => {
      if (lowerCommand.includes('wash') || lowerCommand.includes('washing')) {
        setBookingDetails(prev => ({ ...prev, serviceType: 'Wash & Fold' }))
        addMessage('bot', 'Great! I\'ve set your service type to Wash & Fold. How many items would you like to wash?')
      } else if (lowerCommand.includes('dry clean') || lowerCommand.includes('dry cleaning')) {
        setBookingDetails(prev => ({ ...prev, serviceType: 'Dry Clean' }))
        addMessage('bot', 'Perfect! I\'ve set your service type to Dry Clean. How many items do you have?')
      } else if (lowerCommand.includes('iron') || lowerCommand.includes('ironing')) {
        setBookingDetails(prev => ({ ...prev, serviceType: 'Ironing' }))
        addMessage('bot', 'Excellent! I\'ve set your service type to Ironing. How many items need ironing?')
      } else if (/\d+/.test(lowerCommand)) {
        const quantity = lowerCommand.match(/\d+/)[0]
        setBookingDetails(prev => ({ ...prev, quantity }))
        addMessage('bot', `Got it! I've noted ${quantity} items. When would you like to schedule the pickup?`)
      } else if (lowerCommand.includes('today') || lowerCommand.includes('now')) {
        const today = new Date().toISOString().split('T')[0]
        setBookingDetails(prev => ({ ...prev, pickupDate: today }))
        addMessage('bot', 'Perfect! I\'ve scheduled the pickup for today. What time would be convenient?')
      } else if (lowerCommand.includes('tomorrow')) {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        setBookingDetails(prev => ({ ...prev, pickupDate: tomorrow.toISOString().split('T')[0] }))
        addMessage('bot', 'Great! I\'ve scheduled the pickup for tomorrow. What time works for you?')
      } else if (lowerCommand.includes('morning') || lowerCommand.includes('am')) {
        setBookingDetails(prev => ({ ...prev, pickupTime: '09:00' }))
        addMessage('bot', 'Morning pickup scheduled! Any special instructions?')
      } else if (lowerCommand.includes('afternoon')) {
        setBookingDetails(prev => ({ ...prev, pickupTime: '14:00' }))
        addMessage('bot', 'Afternoon pickup scheduled! Any special instructions?')
      } else if (lowerCommand.includes('evening') || lowerCommand.includes('pm')) {
        setBookingDetails(prev => ({ ...prev, pickupTime: '18:00' }))
        addMessage('bot', 'Evening pickup scheduled! Any special instructions?')
      } else if (lowerCommand.includes('confirm') || lowerCommand.includes('book') || lowerCommand.includes('submit')) {
        if (bookingDetails.serviceType && bookingDetails.quantity) {
          handleSubmitBooking()
        } else {
          addMessage('bot', 'I need a bit more information. Please specify the service type and quantity.')
        }
      } else if (lowerCommand.includes('cancel') || lowerCommand.includes('reset')) {
        setBookingDetails({
          serviceType: '',
          quantity: '',
          pickupDate: '',
          pickupTime: '',
          specialInstructions: ''
        })
        addMessage('bot', 'Booking cancelled. How can I help you start a new booking?')
      } else if (lowerCommand.includes('hello') || lowerCommand.includes('hi')) {
        addMessage('bot', 'Hello! How can I assist you with your laundry booking today?')
      } else if (lowerCommand.includes('help')) {
        addMessage('bot', 'I can help you book laundry services. You can tell me: service type (wash, dry clean, iron), quantity, pickup date and time. Just speak naturally or type your request!')
      } else {
        addMessage('bot', 'I understand. Could you please specify: service type (wash, dry clean, or iron), quantity, and pickup time? Or type "help" for more information.')
      }
      setIsProcessing(false)
    }, 1000)
  }

  const toggleListening = () => {
    if (!recognitionRef.current) {
      addMessage('bot', 'Sorry, voice recognition is not supported in your browser. Please use Chrome or Edge.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      if (transcript.trim()) {
        addMessage('user', transcript)
        processCommand(transcript)
        setTranscript('')
      }
    } else {
      try {
        recognitionRef.current.start()
        setIsListening(true)
        addMessage('bot', 'I\'m listening... Please speak your booking details.')
      } catch (e) {
        addMessage('bot', 'Please allow microphone access and try again.')
      }
    }
  }

  const handleTextSubmit = (e) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    addMessage('user', chatInput)
    processCommand(chatInput)
    setChatInput('')
  }

  const handleSubmitBooking = () => {
    if (!bookingDetails.serviceType || !bookingDetails.quantity) {
      addMessage('bot', 'Please provide service type and quantity before confirming.')
      return
    }

    const booking = {
      ...bookingDetails,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    dispatch(addBooking(booking))
    addMessage('bot', 'Booking confirmed! Your laundry service has been scheduled. You will receive a confirmation email shortly.')
    
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }

  const handleManualInput = (field, value) => {
    setBookingDetails(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="booking-container">
      <nav className="booking-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Laundry Booking</h2>
        <div></div>
      </nav>

      <div className="booking-content">
        <div className="booking-main">
          <div className="chat-section">
            <div className="chat-tabs">
              <button 
                className={`tab-button ${activeTab === 'voice' ? 'active' : ''}`}
                onClick={() => setActiveTab('voice')}
              >
                🎤 Voice Chat
              </button>
              <button 
                className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
                onClick={() => setActiveTab('text')}
              >
                💬 Text Chat
              </button>
            </div>

            <div className="chat-header">
              <h3>Assistant</h3>
              {activeTab === 'voice' && (
                <div className={`listening-indicator ${isListening ? 'active' : ''}`}>
                  <span className="pulse"></span>
                  {isListening ? 'Listening...' : 'Ready'}
                </div>
              )}
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.type}`}>
                  <div className="message-content">
                    {msg.type === 'bot' && <span className="bot-icon">🤖</span>}
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="message bot">
                  <div className="message-content">
                    <span className="bot-icon">🤖</span>
                    <p>Processing...</p>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {activeTab === 'voice' ? (
              <div className="voice-controls">
                <div className="transcript-display">
                  {transcript && <p>You said: {transcript}</p>}
                </div>
                <button
                  onClick={toggleListening}
                  className={`voice-button ${isListening ? 'listening' : ''}`}
                >
                  {isListening ? (
                    <>
                      <span className="mic-icon">🎤</span>
                      Stop Listening
                    </>
                  ) : (
                    <>
                      <span className="mic-icon">🎤</span>
                      Start Voice Command
                    </>
                  )}
                </button>
              </div>
            ) : (
              <form onSubmit={handleTextSubmit} className="text-chat-form">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Type your message..."
                  className="chat-input"
                />
                <button type="submit" className="send-button">
                  Send
                </button>
              </form>
            )}
          </div>

          <div className="booking-form-section">
            <h3>Booking Details</h3>
            <div className="booking-form">
              <div className="form-row">
                <label>Service Type</label>
                <select
                  value={bookingDetails.serviceType}
                  onChange={(e) => handleManualInput('serviceType', e.target.value)}
                >
                  <option value="">Select service</option>
                  <option value="Wash & Fold">Wash & Fold</option>
                  <option value="Dry Clean">Dry Clean</option>
                  <option value="Ironing">Ironing</option>
                </select>
              </div>

              <div className="form-row">
                <label>Quantity</label>
                <input
                  type="number"
                  value={bookingDetails.quantity}
                  onChange={(e) => handleManualInput('quantity', e.target.value)}
                  placeholder="Number of items"
                  min="1"
                />
              </div>

              <div className="form-row">
                <label>Pickup Date</label>
                <input
                  type="date"
                  value={bookingDetails.pickupDate}
                  onChange={(e) => handleManualInput('pickupDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="form-row">
                <label>Pickup Time</label>
                <input
                  type="time"
                  value={bookingDetails.pickupTime}
                  onChange={(e) => handleManualInput('pickupTime', e.target.value)}
                />
              </div>

              <div className="form-row">
                <label>Special Instructions</label>
                <textarea
                  value={bookingDetails.specialInstructions}
                  onChange={(e) => handleManualInput('specialInstructions', e.target.value)}
                  placeholder="Any special instructions..."
                  rows="3"
                />
              </div>

              <button onClick={handleSubmitBooking} className="submit-booking-button">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Booking
