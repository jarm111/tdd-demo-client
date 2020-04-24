import React from 'react'
import { render } from '@testing-library/react'
import EventList from './EventList'

describe('<EventList />', () => {
  it('displays list of events', () => {
    const events = [
      { id: '1', title: 'My event one', date: '2020-04-24' },
      { id: '2', title: 'My event two', date: '2020-04-25' },
      { id: '3', title: 'My event three', date: '2020-04-26' },
    ]

    const { getAllByText } = render(<EventList events={events} />)

    expect(getAllByText('My event', { exact: false })).toHaveLength(3)
  })
})
