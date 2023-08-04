import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS } from './queries'

export const updateCache = (cache, query, addedPerson) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }
  cache.updateQuery(query, ({ allPersons }) => {
    return {
      allPersons: uniqByName(allPersons.concat(addedPerson)),
    }
  })
}

const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('books')
  const [error, setError] = useState('')
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
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

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={setError} setPage={setPage} />
      <Recommendations show={page === 'recommendations'} />

      <LoginForm
        show={page === 'loginform'}
        setToken={setToken}
        setPage={setPage}
      />
    </div>
  )
}

export default App
