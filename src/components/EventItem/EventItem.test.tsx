import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EventItem from './EventItem'
import events from '../../mocks/eventsMockData'
import { user } from '../../mocks/userMockData'

test('displays event title and date', () => {
  const [event] = events
  const { title, date, category, id } = event
  const handleClick = jest.fn()
  const handleEdit = jest.fn()
  const { getByText } = render(
    <EventItem
      event={event}
      onClick={handleClick}
      onEdit={handleEdit}
      user={null}
    />
  )

  getByText(date)
  getByText(category)
  fireEvent.click(getByText(title))

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(id)
})

test('has edit button if users own event', () => {
  const [event] = events
  const handleClick = jest.fn()
  const handleEdit = jest.fn()
  const { getByText } = render(
    <EventItem
      event={event}
      onClick={handleClick}
      onEdit={handleEdit}
      user={user}
    />
  )

  fireEvent.click(getByText('edit', { exact: false }))

  expect(handleEdit).toHaveBeenCalledTimes(1)
  expect(handleEdit).toHaveBeenCalledWith(event.id)
  expect(handleClick).toHaveBeenCalledTimes(0)
})
