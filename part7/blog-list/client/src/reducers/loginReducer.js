import { createSlice } from '@reduxjs/toolkit'

import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    login(state, action) {
      return action.payload
    },
    logout(state, action) {
      return action.payload
    },
  },
})

export const { login, logout } = loginSlice.actions

export const userLogin = (credentials) => {
  return async (dispatch) => {
    const { username, password } = credentials
    try {
      const user = await loginService.login({
        username,
        password,
      })
      loginService.setLoggedUser(user)
      dispatch(login(user))
      setNotification(`${username} logged in!`, 5)
    } catch (exception) {
      dispatch(setNotification(`Error: ${exception.response.data.error}`, 5))
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    loginService.clearStorage()
    dispatch(logout(null))
  }
}

export default loginSlice.reducer
