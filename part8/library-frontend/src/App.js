import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, USER } from './queries'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)

  const client = useApolloClient()
  const user = useQuery(USER)
  const books = useQuery(ALL_BOOKS)
  const authors = useQuery(ALL_AUTHORS)

  if (books.loading || authors.loading) {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ? (
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommendations')}>
              recommendations
            </button>
            <button onClick={logout}>logout</button>
          </span>
        ) : (
          <button onClick={() => setPage('loginform')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors.data.allAuthors} />

      <Books show={page === 'books'} books={books.data.allBooks} />

      <NewBook show={page === 'add'} />
      <Recommendations
        show={page === 'recommendations'}
        favouriteGenre={user.data.me.favouriteGenre}
        books={books.data.allBooks}
      />

      <LoginForm
        show={page === 'loginform'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
