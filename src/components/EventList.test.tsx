import React from 'react'
import { render } from '@testing-library/react'
import EventList from './EventList'
import events from '../mocks/eventsMockData'

describe('<EventList />', () => {
  it('displays list of events', () => {
    const { getAllByText } = render(<EventList events={events} />)

    expect(getAllByText('My event', { exact: false })).toHaveLength(3)
  })
})
