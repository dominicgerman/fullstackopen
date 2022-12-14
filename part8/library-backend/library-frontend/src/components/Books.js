import { useEffect, useState } from 'react'

const Books = ({ show, books, filteredBooks, setGenre }) => {
  const genres = [...new Set(books.flatMap((b) => b.genres))]

  const [booksToShow, setBooksToShow] = useState(books)

  useEffect(() => {
    if (filteredBooks.data) {
      setBooksToShow(filteredBooks.data.allBooks)
    }
  }, [filteredBooks.data])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genres.map((g) => (
          <button
            onClick={({ target }) => setGenre(target.value)}
            key={g}
            value={g}
          >
            {g}
          </button>
        ))}
        <button onClick={() => setBooksToShow(books)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
