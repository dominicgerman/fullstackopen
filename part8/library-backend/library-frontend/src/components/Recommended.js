import { useEffect, useState } from 'react'

const Recommended = ({ show, filteredBooks, genre }) => {
  const [booksToShow, setBooksToShow] = useState(null)

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
      <h2>recommended</h2>
      <div>
        books in your favorite genre <strong>{genre}</strong>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksToShow?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended
