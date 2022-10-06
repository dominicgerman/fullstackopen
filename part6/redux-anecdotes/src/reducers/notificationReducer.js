import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      let message = action.payload
      return message
    },
  },
})

// const notificationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.filter
//     default:
//       return state
//   }
// }

export const { setMessage } = notificationSlice.actions
export default notificationSlice.reducer
// export default notificationReducer
