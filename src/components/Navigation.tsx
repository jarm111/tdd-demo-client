import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  onLogout: () => void
}

const Navigation = ({ isLoggedIn, onLogout }: Props) => {
  const LogoutButton = () => <button onClick={onLogout}>Log out</button>

  return (
    <ul>
      <li>
        <Link to="/">Events</Link>
      </li>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        {isLoggedIn ? (
          <Link to="/">
            <LogoutButton />
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </li>
    </ul>
  )
}

export default Navigation
