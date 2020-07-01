import React from 'react'
import { action } from '@storybook/addon-actions'
import EventForm from './EventForm'
import events from '../../mocks/eventsMockData'

export default {
  title: 'EventForm',
}

export const withoutEvent = () => <EventForm onSubmit={action('clicked')} />
export const withEvent = () => (
  <EventForm onSubmit={action('clicked')} event={events[0]} />
)
