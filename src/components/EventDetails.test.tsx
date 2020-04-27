import React from 'react'
import { render } from '@testing-library/react'
import EventDetails from './EventDetails'

describe('<EventDetails />', () => {
  it('displays details of event', () => {
    const title = 'My event one'
    const date = '2020-04-24'
    const description = 'Welcome to my event.'

    const { getByText } = render(
      <EventDetails title={title} date={date} description={description} />
    )

    getByText(title)
    getByText(date)
    getByText(description)
  })
})
