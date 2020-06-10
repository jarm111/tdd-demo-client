import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Navigation from './Navigation'

test('navigates to links', () => {
  const history = createMemoryHistory()

  const { getByText } = render(
    <Router history={history}>
      <Navigation />
    </Router>
  )

  fireEvent.click(getByText('events', { exact: false }))

  expect(history.location.pathname).toBe('/')

  fireEvent.click(getByText('create', { exact: false }))

  expect(history.location.pathname).toBe('/create')

  fireEvent.click(getByText('sign up', { exact: false }))

  expect(history.location.pathname).toBe('/signup')
})
