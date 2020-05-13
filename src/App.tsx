import React from 'react'
import { Switch, Route, useParams } from 'react-router-dom'
import EventsPaige from './paiges/EventsPaige'
import CreateEventPage from './paiges/CreateEventPage'
import Navigation from './components/Navigation'
import EventDetails from './components/EventDetails'
import { useTypedSelector } from './store'

const App = () => {
  const events = useTypedSelector((state) => state.events)

  const ShowEventDetails = () => {
    const { id } = useParams()
    const event = events.find((event) => event.id === id)

    return event ? <EventDetails event={event} /> : null
  }

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
          <ShowEventDetails />
        </Route>
      </Switch>
    </>
  )
}

export default App
