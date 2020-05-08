import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Events</Link>
      </li>
      <li>
        <Link to="/create">Create</Link>
      </li>
    </ul>
  )
}

export default Navigation
