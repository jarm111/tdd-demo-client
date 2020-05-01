import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventItem from './EventItem'
import events from '../mocks/eventsMockData'

const [event] = events

export default {
  title: 'EventItem',
  decorators: [withKnobs],
}

export const withEvent = () => <EventItem event={object('Event', event)} />
