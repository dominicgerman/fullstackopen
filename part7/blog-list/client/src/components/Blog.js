import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { Button } from '@mui/material'

const Blog = () => {
  const [visible, setVisible] = useState(false)

  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))

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
    console.log(id)
    dispatch(updateBlog(id, { ...blog, likes: blog.likes + 1 }))
  }

  const removeBlog = () => {
    dispatch(deleteBlog(blog))
    navigate('/blogs')
  }

  return (
    <div style={blogStyle} className="blogDisplay">
      <div>
        <strong>{blog?.title}</strong> by {blog?.author}
        <Button onClick={toggleVisibility} className="toggleView">
          {visible ? 'Hide details' : 'View details'}
        </Button>
      </div>
      <div style={showWhenVisible} className="hiddenByDefault">
        <p>URL: {blog?.url}</p>
        <p>Likes: {blog?.likes}</p>{' '}
        <Button
          color="secondary"
          variant="outlined"
          onClick={addLike}
          className="likeButton"
        >
          Like
        </Button>
        <Button onClick={removeBlog} className="removeButton">
          Remove Blog
        </Button>
      </div>
    </div>
  )
}

export default Blog
