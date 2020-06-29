import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EventItem from './EventItem'
import events from '../../mocks/eventsMockData'

test('displays event title and date', () => {
  const [event] = events
  const { title, date, category, id } = event
  const handleClick = jest.fn()
  const { getByText } = render(
    <EventItem event={event} onClick={handleClick} />
  )

  getByText(date)
  getByText(category)
  fireEvent.click(getByText(title))

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(id)
})
