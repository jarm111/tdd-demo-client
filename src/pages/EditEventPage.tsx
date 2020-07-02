import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import { editEvent, resetEditEventLoading } from '../slices/eventsSlice'
import NewEvent from '../types/NewEvent'
import EventForm from '../components/EventForm/EventForm'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const EditEventPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { events, editEventLoading } = useTypedSelector((state) => state.events)
  const event = events.find((event) => event.id === id)

  useEffect(() => {
    if (editEventLoading === 'success') {
      dispatch(resetEditEventLoading())
      history.push('/')
    }
  }, [dispatch, editEventLoading, history])

  const handleSubmit = (data: NewEvent) => {
    event && dispatch(editEvent({ ...event, ...data }))
  }

  return (
    <div>
      <h2>Edit event</h2>
      {event && <EventForm onSubmit={handleSubmit} event={event} />}
      <LoadingIndicator loading={editEventLoading === 'pending'} />
    </div>
  )
}

export default EditEventPage
