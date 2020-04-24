import React from 'react'
import { render } from '@testing-library/react'
import EventItem from './EventItem'

describe('<EventItem />', () => {
  it('displays event title and date', () => {
    const title = 'My test event'
    const date = '2020-04-24'

    const { getByText } = render(<EventItem title={title} date={date} />)

    getByText(title)
    getByText(date)
  })
})
