import { useQuery } from '@apollo/client'
import React from 'react'
import { USER_RECOMMENDED } from '../queries'

const Recommendations = ({ show }) => {
  const {loading, data} = useQuery(USER_RECOMMENDED)
  

  if (!show) {
    return null
  }
  if (loading) return <div>loading...</div>

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favourite genre:<strong></strong> </div>
      <div>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.userRecommended.map((a) => (
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
