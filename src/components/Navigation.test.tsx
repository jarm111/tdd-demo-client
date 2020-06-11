import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import Navigation from './Navigation'
import * as ReactRedux from 'react-redux'

jest.mock('react-redux')
const mockedReactRedux = ReactRedux as jest.Mocked<typeof ReactRedux>

test('navigates to links', () => {
  mockedReactRedux.useSelector.mockReturnValueOnce(null)

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

test('log out visible and clickable when user is logged in', () => {
  const mockedDispatch = jest.fn()
  mockedReactRedux.useSelector.mockReturnValueOnce(true)
  mockedReactRedux.useDispatch = jest.fn(() => mockedDispatch)

  const history = createMemoryHistory()

  const { getByText } = render(
    <Router history={history}>
      <Navigation />
    </Router>
  )

  fireEvent.click(getByText('log out', { exact: false }))

  expect(history.location.pathname).toBe('/')
  expect(mockedDispatch).toHaveBeenCalledTimes(1)
})
