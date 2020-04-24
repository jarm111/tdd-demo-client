import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import EventItem from './EventItem'

export default {
  title: 'EventItem',
  decorators: [withKnobs],
}

export const withProps = () => (
  <EventItem
    title={text('Title', 'My lovely event')}
    date={text('Date', '2020-04-24')}
  />
)
