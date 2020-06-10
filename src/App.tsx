import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsPaige from './pages/EventsPaige'
import CreateEventPage from './pages/CreateEventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import Navigation from './components/Navigation'
import SignupPage from './pages/SignupPage'

const App = () => {
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path={'/'}>
          <EventsPaige />
        </Route>
        <Route path={'/create'}>
          <CreateEventPage />
        </Route>
        <Route path={'/event/:id'}>
          <EventDetailsPage />
        </Route>
        <Route path={'/signup'}>
          <SignupPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
