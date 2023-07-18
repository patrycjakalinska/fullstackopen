import { useState } from 'react'

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)

  if (!show) {
    return null
  }

  const genresList = []
  books.forEach((b) =>
    b.genres.forEach((g) => !genresList.includes(g) && genresList.push(g))
  )

  const filteredBooks = books.filter((b) =>
    filter === null ? b : b.genres.includes(filter)
  )

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
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genresList.map((g) => (
          <button key={g} onClick={() => setFilter(g)}>
            {g}
          </button>
        ))}
        <button onClick={() => setFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
