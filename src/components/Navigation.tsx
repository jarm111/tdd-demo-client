import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import { logout } from '../slices/userSlice'

const Navigation = () => {
  const user = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()

  const LogoutButton = () => (
    <button onClick={() => dispatch(logout())}>Log out</button>
  )

  return (
    <ul>
      <li>
        <Link to="/">Events</Link>
      </li>
      <li>
        <Link to="/create">Create</Link>
      </li>
      <li>
        {user ? (
          <Link to="/">
            <LogoutButton />
          </Link>
        ) : (
          <Link to="/signup">Sign up</Link>
        )}
      </li>
    </ul>
  )
}

export default Navigation
