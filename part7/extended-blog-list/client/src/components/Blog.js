import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import loginService from '../services/login'
import { Button, TextField } from '@mui/material'

const Blog = () => {
  const [visible, setVisible] = useState(true)
  const [newComment, setNewComment] = useState('')

  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const loggedUsername = loginService.getLoggedUser().username

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = {
    display: visible ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'start',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const { id } = blog
    dispatch(updateBlog(id, { ...blog, likes: blog.likes + 1 }))
  }

  const addComment = () => {
    const { id } = blog
    dispatch(
      updateBlog(id, {
        ...blog,
        comments:
          blog.comments.length > 0
            ? [...blog.comments, newComment]
            : [newComment],
      })
    )
    setNewComment('')
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
    navigate('/blogs')
  }

  return (
    <div style={blogStyle} className="blogDisplay">
      <div>
        <h1>{blog?.title}</h1>
        by {blog?.author}
      </div>
      <div style={showWhenVisible} className="hiddenByDefault">
        <p>{blog?.url}</p>
        <p>Likes: {blog?.likes}</p>{' '}
        <Button
          color="secondary"
          variant="outlined"
          onClick={addLike}
          className="likeButton"
        >
          Like
        </Button>
        <h2>Comments</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField
              type="text"
              className="commentInput"
              id="outlined-multiline-flexible"
              label="Comment"
              multiline
              value={newComment}
              onChange={({ target }) => setNewComment(target.value)}
            />
            <Button color="secondary" variant="outlined" onClick={addComment}>
              Add comment
            </Button>
          </div>
        </div>
        <ul>
          {blog?.comments?.map((c) => (
            <li key={Math.random()}>{c}</li>
          ))}
        </ul>
      </div>
      <Button onClick={toggleVisibility} className="toggleView">
        {visible ? 'Hide details' : 'View details'}
      </Button>
      {loggedUsername === blog.user.username ? (
        <Button
          style={{ display: 'block' }}
          onClick={removeBlog}
          className="removeButton"
        >
          Remove Blog
        </Button>
      ) : null}
    </div>
  )
}

export default Blog
