import { configureStore } from '@reduxjs/toolkit'
import bookingsReducer from './slices/bookingsSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    bookings: bookingsReducer,
    user: userReducer,
  },
})




