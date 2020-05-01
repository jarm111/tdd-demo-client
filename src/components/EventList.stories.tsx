import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventList from './EventList'
import events from '../mocks/eventsMockData'

export default {
  title: 'EventList',
  decorators: [withKnobs],
}

export const withEvents = () => <EventList events={object('Events', events)} />
