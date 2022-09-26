import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            className="titleInput"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            className="authorInput"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            className="urlInput"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>

        <button type="submit" className="submitButton">
          create
        </button>
      </form>
    </div>
  )
}

export default NewBlogForm
