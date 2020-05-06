import React from 'react'
import { useDispatch } from 'react-redux'
import EventList from './components/EventList'
import EventForm from './components/EventForm'
import { useTypedSelector } from './store'
import { addEvent } from './slices/eventsSlice'

const App = () => {
  const events = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()

  const generateRandomId = () =>
    Math.floor(Math.random() * Math.floor(1000000000))

  const handleSubmit = (data: any) => {
    const id = generateRandomId()
    const newEventWithId = { ...data, id }
    dispatch(addEvent(newEventWithId))
  }

  return (
    <>
      <h1>Events</h1>
      <EventList events={events} />
      <h2>Create new event</h2>
      <EventForm onSubmit={handleSubmit} />
    </>
  )
}

export default App
