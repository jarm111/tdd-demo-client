import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import EventList from './EventList'
import events from '../mocks/eventsMockData'

test('displays list of events', () => {
  const handleClick = jest.fn()
  const { getAllByText } = render(
    <EventList onClick={handleClick} events={events} />
  )

  const items = getAllByText('My event', { exact: false })

  expect(items).toHaveLength(3)

  fireEvent.click(items[0])

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(events[0].id)
})
