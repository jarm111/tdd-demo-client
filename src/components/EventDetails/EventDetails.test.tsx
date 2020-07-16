import React from 'react'
import { render } from '@testing-library/react'
import EventDetails from './EventDetails'
import events from '../../mocks/eventsMockData'

test('displays details of event', () => {
  const [event] = events
  const { title, date, description, category } = event

  const { getByText } = render(<EventDetails event={event} />)

  getByText(title)
  getByText(date, { exact: false })
  getByText(category, { exact: false })
  getByText(description, { exact: false })
})
