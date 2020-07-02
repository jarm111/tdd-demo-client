import React from 'react'
import { action } from '@storybook/addon-actions'
import { withKnobs, object } from '@storybook/addon-knobs'
import EventItem from './EventItem'
import events from '../../mocks/eventsMockData'
import { user } from '../../mocks/userMockData'

const [event] = events

export default {
  title: 'EventItem',
  decorators: [withKnobs],
}

export const withEvent = () => (
  <EventItem
    onClick={action('clicked')}
    event={object('Event', event)}
    onEdit={action('edit clicked')}
    user={null}
  />
)

export const withEventAndUser = () => (
  <EventItem
    onClick={action('clicked')}
    event={object('Event', event)}
    onEdit={action('edit clicked')}
    user={object('User', user)}
  />
)
