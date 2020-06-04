import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addEvent } from '../slices/eventsSlice'
import EventForm from '../components/EventForm'

const CreateEventPage = () => {
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

  return (
    <div>
      <h2>Create new event</h2>
      <EventForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreateEventPage
