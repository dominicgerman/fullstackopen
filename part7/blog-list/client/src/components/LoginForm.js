import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../reducers/loginReducer'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import { Alert } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const message = useSelector((state) => state.notification)

  const handleLogin = (event) => {
    event.preventDefault()
    const credentials = {
      username,
      password,
    }
    dispatch(userLogin(credentials))
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <div>{message && <Alert severity="error">{message}</Alert>}</div>{' '}
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <TextField
            label="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
