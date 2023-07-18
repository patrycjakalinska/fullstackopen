const Recommendations = ({ show, favouriteGenre, books }) => {
  if (!show) {
    return null
  }
  const filteredBooks = books.filter((b) => b.genres.includes(favouriteGenre))
  console.log(filteredBooks)

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favourite genre: <strong>{favouriteGenre}</strong>
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default Recommendations
