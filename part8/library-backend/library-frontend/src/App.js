import { useQuery } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_AUTHORS } from './queries'
import { ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  console.log(authors)
  console.log(books)

  if (authors.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        setError={notify}
        authors={authors.data.allAuthors}
        show={page === 'authors'}
      />

      <Books books={books.data.allBooks} show={page === 'books'} />

      <NewBook setError={notify} show={page === 'add'} />
    </div>
  )
}

const Notify = ({ errorMessage }) => {
  if (!errorMessage) {
    return null
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
