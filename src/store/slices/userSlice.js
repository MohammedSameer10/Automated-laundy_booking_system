import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  profileImage: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    setProfileImage: (state, action) => {
      state.profileImage = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.profileImage = null
    },
  },
})

export const { setUser, setProfileImage, logout } = userSlice.actions

export default userSlice.reducer




