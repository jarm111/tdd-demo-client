import React from 'react'
import { action } from '@storybook/addon-actions'
import EventForm from './EventForm'

export default {
  title: 'EventForm',
}

export const withProps = () => <EventForm onSubmit={action('clicked')} />
