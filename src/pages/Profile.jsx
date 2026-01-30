import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { setProfileImage } from '../store/slices/userSlice'
import { getRandomProfileImage } from '../utils/profileImages'
import './Profile.css'

const Profile = () => {
  const { user, profileImage } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [localUser, setLocalUser] = useState(user || {})

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    const storedImage = localStorage.getItem('profileImage')
    if (storedUser) {
      setLocalUser(JSON.parse(storedUser))
    }
    if (storedImage && !profileImage) {
      dispatch(setProfileImage(storedImage))
    }
  }, [dispatch, profileImage])

  const handleImageChange = () => {
    const newImage = getRandomProfileImage()
    localStorage.setItem('profileImage', newImage)
    dispatch(setProfileImage(newImage))
  }

  return (
    <div className="profile-container">
      <nav className="profile-nav">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Back to Dashboard
        </button>
        <h2>My Profile</h2>
        <div></div>
      </nav>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-image-container">
              <img 
                src={profileImage || getRandomProfileImage()} 
                alt="Profile" 
                className="profile-image"
              />
              <button onClick={handleImageChange} className="change-image-button">
                Change Photo
              </button>
            </div>
            <div className="profile-info">
              <h1>{localUser.name || 'User'}</h1>
              <p className="profile-email">{localUser.email}</p>
              {localUser.phone && <p className="profile-phone">{localUser.phone}</p>}
            </div>
          </div>

          <div className="profile-details">
            <div className="detail-section">
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{localUser.name || 'Not set'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{localUser.email || 'Not set'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{localUser.phone || 'Not set'}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>Account Settings</h3>
              <button onClick={() => navigate('/settings')} className="settings-button">
                Edit Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile




