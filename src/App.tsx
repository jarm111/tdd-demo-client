import React from 'react'
import { Switch, Route } from 'react-router-dom'
import EventsPaige from './paiges/EventsPaige'
import CreateEventPage from './paiges/CreateEventPage'
import EventDetailsPage from './paiges/EventDetailsPage'
import Navigation from './components/Navigation'

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
      </Switch>
    </>
  )
}

export default App
