import { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = (blogObj) => {
    updateBlog(blogObj.id, {
      title: blogObj.title,
      author: blogObj.author,
      url: blogObj.url,
      likes: blogObj.likes + 1,
      user: blogObj.user._id,
    })
  }

  return (
    <div style={blogStyle} className="blogDisplay">
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleVisibility} className="toggleView">
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible} className="hiddenByDefault">
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={() => addLike(blog)} className="likeButton">
            like
          </button>
        </div>
        <div></div>
        <button onClick={() => deleteBlog(blog.id)} className="removeButton">
          remove
        </button>
      </div>
    </div>
  )
}

export default Blog
