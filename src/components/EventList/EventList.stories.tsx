import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventList from './EventList'
import events from '../../mocks/eventsMockData'
import { user } from '../../mocks/userMockData'

export default {
  title: 'EventList',
  decorators: [withKnobs],
}

export const withEvents = () => (
  <EventList
    onClick={action('clicked')}
    events={object('Events', events)}
    onEdit={action('clicked edit')}
    user={null}
  />
)

export const withEventsAndUser = () => (
  <EventList
    onClick={action('clicked')}
    events={object('Events', events)}
    onEdit={action('clicked edit')}
    user={user}
  />
)
