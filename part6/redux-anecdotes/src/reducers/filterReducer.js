import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      let filter = action.payload
      return filter
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

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
