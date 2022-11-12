import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
// import { useRef } from 'react'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    updateBlogs(state, action) {
      return state.map((b) => (b.id !== action.payload.id ? b : action.payload))
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
  },
})

export const { appendBlog, setBlogs, updateBlogs, removeBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
    dispatch(
      setNotification(
        `Added a new blog: ${blogObject.title} by ${blogObject.author} `,
        5
      )
    )
  }
}

export const updateBlog = (id, blogObject) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, blogObject)
    dispatch(updateBlogs(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  window.confirm('Remove blog?')
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
  }
}

export default blogSlice.reducer
