import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
  },
})

export const { setMessage } = notificationSlice.actions

let timeoutID = null

export const setNotification = (message, seconds) => {
  return async (dispatch) => {
    dispatch(setMessage(message))

    if (timeoutID) clearTimeout(timeoutID)

    timeoutID = setTimeout(() => {
      dispatch(setMessage(null))
    }, seconds * 1000)
  }
}

export default notificationSlice.reducer
