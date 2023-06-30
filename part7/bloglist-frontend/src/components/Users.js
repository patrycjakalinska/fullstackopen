import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/userReducer'

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overlofw-hideen">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b bg-blue-100 font-medium">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    name
                  </th>
                  <th scope="col" className="px-6 py-4">
                    blogs created
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-b " key={user.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.blogs.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
