import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
}

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    addBooking: (state, action) => {
      const newBooking = {
        id: Date.now().toString(),
        ...action.payload,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      state.bookings.push(newBooking)
      state.currentBooking = newBooking
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id)
      if (index !== -1) {
        state.bookings[index] = { ...state.bookings[index], ...action.payload }
      }
    },
    cancelBooking: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload)
      if (index !== -1) {
        state.bookings[index].status = 'cancelled'
      }
    },
    completeBooking: (state, action) => {
      const index = state.bookings.findIndex(b => b.id === action.payload)
      if (index !== -1) {
        state.bookings[index].status = 'completed'
      }
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const {
  addBooking,
  updateBooking,
  cancelBooking,
  completeBooking,
  setCurrentBooking,
  clearCurrentBooking,
  setLoading,
  setError,
} = bookingsSlice.actions

export default bookingsSlice.reducer




