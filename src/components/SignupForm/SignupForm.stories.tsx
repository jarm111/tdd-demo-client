import React from 'react'
import { action } from '@storybook/addon-actions'
import SignupForm from './SignupForm'

export default {
  title: 'SignupForm',
}

export const withProps = () => <SignupForm onSubmit={action('clicked')} />
