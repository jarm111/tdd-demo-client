import React from 'react'
import { useDispatch } from 'react-redux'
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams,
} from 'react-router-dom'
import { createHashHistory } from 'history'
import Navigation from './components/Navigation'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import EventDetails from './components/EventDetails'
import { useTypedSelector } from './store'
import { addEvent } from './slices/eventsSlice'

const App = () => {
  const events = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()
  const history = createHashHistory()

  const generateRandomId = () =>
    Math.floor(Math.random() * Math.floor(1000000000)).toString()

  const handleSubmit = (data: any) => {
    const id = generateRandomId()
    const newEventWithId = { ...data, id }
    dispatch(addEvent(newEventWithId))
    history.push('/')
  }

  const handleClick = (eventId: number) => {
    history.push(`/event/${eventId}`)
  }

  const ShowEventDetails = () => {
    const { id } = useParams()
    const event = events.find((event) => event.id === id)

    if (!event) return null
    return <EventDetails event={event} />
  }

  return (
    <Router>
      <Navigation />
      <Switch>
        <Route exact path={'/'}>
          <h1>Events</h1>
          <EventList onClick={handleClick} events={events} />
        </Route>
        <Route path={'/create'}>
          <h2>Create new event</h2>
          <EventForm onSubmit={handleSubmit} />
        </Route>
        <Route path={'/event/:id'}>
          <h2>Event</h2>
          <ShowEventDetails />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
