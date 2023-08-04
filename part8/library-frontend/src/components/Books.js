import { useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED } from '../queries'
import { useEffect, useState } from 'react'
import { updateCache } from '../App'

const Books = ({ show }) => {
  const [filter, setFilter] = useState(null)
  const [genres, setGenres] = useState(null)

  const { loading, data } = useQuery(ALL_BOOKS, {
    variables: { genre: filter },
  })

  useEffect(() => {
    if (data && !genres) {
      const genres = data.allBooks.map((b) => [...b.genres])
      const uniqueGenres = [...new Set(genres.flat())]
      setGenres(uniqueGenres)
    }
  }, [data, genres])

  // i don't know why but subscription is not working how its supposed to do
  // you still need to refresh the page to see freshly added book
  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      try {
        updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        window.alert(`${addedBook.title} added`)
      } catch {
        console.log('error')
      }
    },
  })
  if (!show) {
    return null
  }
  if (loading) return <div>loading...</div>

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
          {data &&
            data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres &&
          genres.map((g) => (
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
