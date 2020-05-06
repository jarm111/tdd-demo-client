import React from 'react'
import { render } from '@testing-library/react'
import EventItem from './EventItem'
import events from '../mocks/eventsMockData'

test('displays event title and date', () => {
  const [event] = events
  const { title, date, category } = event

  const { getByText } = render(<EventItem event={event} />)

  getByText(title)
  getByText(date)
  getByText(category)
})
