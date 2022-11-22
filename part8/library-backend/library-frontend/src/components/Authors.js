import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS } from '../queries'

const SetBirthYear = ({ setError, authors }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    },
  })

  const submit = (event) => {
    event.preventDefault()

    updateAuthor({ variables: { name, born: +born } })

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select value={name} onChange={({ target }) => setName(target.value)}>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>
                {a.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

const Authors = ({ show, setError, authors }) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <SetBirthYear authors={authors} setError={setError} />
    </div>
  )
}

export default Authors
