import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventList from './EventList'

export default {
  title: 'EventList',
  decorators: [withKnobs],
}

const defaultValue = [
  { id: '1', title: 'My event one', date: '2020-04-24' },
  { id: '2', title: 'My event two', date: '2020-04-25' },
  { id: '3', title: 'My event three', date: '2020-04-26' },
]

export const withEvents = () => (
  <EventList events={object('Events', defaultValue)} />
)
