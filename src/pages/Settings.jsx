import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './Settings.css'

const Settings = () => {
  const { user } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: true,
    smsUpdates: false,
    language: 'en',
    theme: 'light'
  })

  useEffect(() => {
    const storedSettings = localStorage.getItem('settings')
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings))
    }
  }, [])

  const handleChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    localStorage.setItem('settings', JSON.stringify(newSettings))
  }

  return (
    <div className="settings-container">
      <nav className="settings-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>Settings</h2>
        <div></div>
      </nav>

      <div className="settings-content">
        <div className="settings-card">
          <h3>Notification Preferences</h3>
          <div className="setting-item">
            <div className="setting-info">
              <label>Push Notifications</label>
              <p>Receive notifications about your bookings</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Email Updates</label>
              <p>Receive booking updates via email</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={(e) => handleChange('emailUpdates', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>SMS Updates</label>
              <p>Receive booking updates via SMS</p>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={settings.smsUpdates}
                onChange={(e) => handleChange('smsUpdates', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        <div className="settings-card">
          <h3>General Settings</h3>
          <div className="setting-item">
            <div className="setting-info">
              <label>Language</label>
              <p>Choose your preferred language</p>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="setting-select"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <label>Theme</label>
              <p>Choose your preferred theme</p>
            </div>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="setting-select"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto</option>
            </select>
          </div>
        </div>

        <div className="settings-card">
          <h3>Account</h3>
          <div className="setting-item">
            <div className="setting-info">
              <label>Email</label>
              <p>{user?.email || 'Not set'}</p>
            </div>
            <button className="edit-button">Edit</button>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <label>Password</label>
              <p>••••••••</p>
            </div>
            <button className="edit-button">Change</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings




