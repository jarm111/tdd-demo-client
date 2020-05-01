import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventDetails from './EventDetails'
import events from '../mocks/eventsMockData'

const [event] = events

export default {
  title: 'EventDetails',
  decorators: [withKnobs],
}

export const withEvent = () => <EventDetails event={object('Event', event)} />
