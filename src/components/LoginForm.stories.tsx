import React from 'react'
import { action } from '@storybook/addon-actions'
import LoginForm from './LoginForm'

export default {
  title: 'LoginForm',
}

export const withProps = () => <LoginForm onSubmit={action('clicked')} />
