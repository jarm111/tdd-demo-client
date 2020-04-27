import React from 'react'
import { withKnobs, text } from '@storybook/addon-knobs'
import EventDetails from './EventDetails'

export default {
  title: 'EventDetails',
  decorators: [withKnobs],
}

export const withProps = () => (
  <EventDetails
    title={text('Title', 'My lovely event')}
    date={text('Date', '2020-04-24')}
    description={text(
      'Description',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
    )}
  />
)
