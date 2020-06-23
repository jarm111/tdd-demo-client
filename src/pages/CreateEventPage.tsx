import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addEvent } from '../slices/eventsSlice'
import EventForm from '../components/EventForm'
import NewEvent from '../types/NewEvent'

const CreateEventPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (data: NewEvent) => {
    dispatch(addEvent(data))
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
