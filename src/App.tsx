import React from 'react'
import { useDispatch } from 'react-redux'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'
import { createHashHistory } from 'history'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import Navigation from './components/Navigation'
import { useTypedSelector } from './store'
import { addEvent } from './slices/eventsSlice'

const App = () => {
  const events = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()
  const history = createHashHistory()

  const generateRandomId = () =>
    Math.floor(Math.random() * Math.floor(1000000000))

  const handleSubmit = (data: any) => {
    const id = generateRandomId()
    const newEventWithId = { ...data, id }
    dispatch(addEvent(newEventWithId))
    history.push('/')
  }

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path={'/'}>
          <h1>Events</h1>
          <EventList events={events} />
        </Route>
        <Route path={'/create'}>
          <h2>Create new event</h2>
          <EventForm onSubmit={handleSubmit} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
