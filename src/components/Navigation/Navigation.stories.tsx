import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import Navigation from './Navigation'

export default {
  title: 'Navigation',
  decorators: [withKnobs],
}

export const withRouterAndProps = () => (
  <Router>
    <Navigation
      isLoggedIn={boolean('isLoggedIn', false)}
      onLogout={action('clicked')}
    />
  </Router>
)
