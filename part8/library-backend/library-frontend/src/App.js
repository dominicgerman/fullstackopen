import { useQuery, useApolloClient } from '@apollo/client'
import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { ALL_AUTHORS, ALL_BOOKS, BOOKS_BY_GENRE, ME } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [genre, setGenre] = useState(null)

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const filteredBooks = useQuery(BOOKS_BY_GENRE, {
    variables: { genre },
    // skip: !genre,
  })
  const currentUser = useQuery(ME)
  const client = useApolloClient()

  if (authors.loading) {
    return <div>loading...</div>
  }
  if (books.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }

  // if (!token) {
  //   return (
  //     <div>
  //       <Notify errorMessage={errorMessage} />
  //       <h2>Login</h2>
  //       <LoginForm setToken={setToken} setError={notify} />
  //     </div>
  //   )
  // }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button
          onClick={() => {
            setPage('books')
            setGenre(null)
          }}
        >
          books
        </button>
        {token ? (
          <div style={{ display: 'inline-block' }}>
            <button onClick={() => setPage('add')}>add book</button>
            <button
              onClick={() => {
                setPage('recommended')
                setGenre(currentUser.data.me.favoriteGenre)
              }}
            >
              recommended
            </button>
            <button onClick={logout}>logout</button>
          </div>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        setError={notify}
        authors={authors.data.allAuthors}
        show={page === 'authors'}
        token={token}
      />

      <Books
        books={books.data.allBooks}
        filteredBooks={filteredBooks}
        setGenre={setGenre}
        show={page === 'books'}
      />

      <LoginForm
        setToken={setToken}
        setError={notify}
        show={page === 'login'}
        setPage={setPage}
      />

      <Recommended
        show={page === 'recommended'}
        books={books.data.allBooks}
        filteredBooks={filteredBooks}
        genre={currentUser.data.me.favoriteGenre}
      />

      <NewBook setError={notify} show={page === 'add'} setPage={setPage} />
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
