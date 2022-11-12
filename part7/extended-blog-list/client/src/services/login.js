import axios from 'axios'
const baseUrl = '/api/login'

let token = null

const getToken = () => token

const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const setLoggedUser = (user) => {
  window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
  token = user.token
}

const clearStorage = () => {
  localStorage.clear()
  token = null
}

const getLoggedUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = user.token
    return user
  }
  return null
}

// eslint-disable-next-line
export default { login, getToken, setLoggedUser, clearStorage, getLoggedUser }
