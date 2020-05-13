import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, useParams, useHistory } from 'react-router-dom'
import EventsPaige from './paiges/EventsPaige'
import Navigation from './components/Navigation'
import EventForm from './components/EventForm'
import EventDetails from './components/EventDetails'
import { useTypedSelector } from './store'
import { addEvent } from './slices/eventsSlice'

const App = () => {
  const events = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()
  const history = useHistory()

  const generateRandomId = () =>
    Math.floor(Math.random() * Math.floor(1000000000)).toString()

  const handleSubmit = (data: any) => {
    const id = generateRandomId()
    const newEventWithId = { ...data, id }
    dispatch(addEvent(newEventWithId))
    history.push('/')
  }

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
          <h2>Create new event</h2>
          <EventForm onSubmit={handleSubmit} />
        </Route>
        <Route path={'/event/:id'}>
          <ShowEventDetails />
        </Route>
      </Switch>
    </>
  )
}

export default App
