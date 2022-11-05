import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { Button } from '@mui/material'

const NewBlogForm = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()
  const style = { marginBottom: '1rem' }

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(createBlog(blogObject))
  }

  return (
    <div>
      <h2>Create New Blog</h2>

      <form onSubmit={addBlog}>
        <div style={style}>
          Title:{' '}
          <input
            type="text"
            className="titleInput"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div style={style}>
          Author:{' '}
          <input
            type="text"
            className="authorInput"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div style={style}>
          Url:{' '}
          <input
            type="text"
            className="urlInput"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <div style={{ margin: '1rem 0' }}>
          <Button variant="contained" type="submit" className="submitButton">
            create
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewBlogForm
