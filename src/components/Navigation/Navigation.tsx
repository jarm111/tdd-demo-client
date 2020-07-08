import React from 'react'
import { Link } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  onLogout: () => void
}

const Navigation = ({ isLoggedIn, onLogout }: Props) => {
  return (
    <nav className="border">
      <div className="nav-brand">
        <h4>
          <Link to="/">Events Board</Link>
        </h4>
      </div>
      <div className="collapsible">
        <input id="collapsible2" type="checkbox" name="collapsible2" />
        <button>
          <label htmlFor="collapsible2">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
          </label>
        </button>
        <div className="collapsible-body">
          <ul className="inline">
            <li>
              <Link to="/">Events</Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link to="/create">Create</Link>
              </li>
            )}
            <li>
              {isLoggedIn ? (
                <Link to="/" onClick={onLogout}>
                  Log out
                </Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
