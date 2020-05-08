import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import Navigation from './Navigation'

export default {
  title: 'Navigation',
}

export const withRouter = () => (
  <Router>
    <Navigation />
  </Router>
)
