import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Navigation from './Navigation'

test('navigates to links', () => {
  const history = createMemoryHistory()
  const isLoggedIn = false
  const onLogout = jest.fn()

  const { getByText } = render(
    <Router history={history}>
      <Navigation isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </Router>
  )

  fireEvent.click(getByText('events', { exact: false }))

  expect(history.location.pathname).toBe('/')

  fireEvent.click(getByText('login', { exact: false }))

  expect(history.location.pathname).toBe('/login')
})

test('log out visible and clickable when user is logged in', () => {
  const history = createMemoryHistory()
  const isLoggedIn = true
  const onLogout = jest.fn()

  const { getByText } = render(
    <Router history={history}>
      <Navigation isLoggedIn={isLoggedIn} onLogout={onLogout} />
    </Router>
  )

  fireEvent.click(getByText('create', { exact: false }))

  expect(history.location.pathname).toBe('/create')

  fireEvent.click(getByText('log out', { exact: false }))

  expect(history.location.pathname).toBe('/')
  expect(onLogout).toHaveBeenCalledTimes(1)
})
