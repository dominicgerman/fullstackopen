import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { Container } from '@mui/material'

import Welcome from './components/Welcome'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import User from './components/User'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'
import { login } from './reducers/loginReducer'

import loginService from './services/login'
import Nav from './components/Nav'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    const userFromStorage = loginService.getLoggedUser()
    if (userFromStorage) {
      dispatch(login(userFromStorage))
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  if (user === null)
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm />
      </div>
    )

  return (
    <Container>
      <Nav user={user.name} />
      <Notification />
      <div>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
        <Togglable buttonLabel="Create New Blog" ref={blogFormRef}>
          <NewBlogForm />
        </Togglable>
      </div>
    </Container>
  )
}

export default App
