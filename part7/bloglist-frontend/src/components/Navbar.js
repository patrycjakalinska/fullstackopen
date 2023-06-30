import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'

const Navbar = ({ username }) => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
  }

  return (
    <nav className="bg-white border-gray-200">
      <div className="flex flex-wrap md:flex-row items-center justify-between px-4">
        <div className="md:flex md:justify-between w-full d:w-auto" id="navbar-default">
          <ul className="font-medium flex items-center flex-col p-4 md:p-6 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li className="text-center">
              <Link
                to="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0"
              >
                blogs
              </Link>
            </li>
            <li className="text-center">
              <Link
                to="/users"
                className="block pt-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              >
                users
              </Link>
            </li>
          </ul>
          <ul className="font-medium flex items-center flex-col p-4 md:p-6 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <p>
                <span className="text-blue-700">{username}</span> logged in
              </p>
            </li>
            <li>
              <button
                type="button"
                className="text-black bg-slate-50 hover:bg-white focus:ring-4 focus:outline-none focus:ring-slate-100 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3"
                onClick={handleLogout}
              >
                logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
