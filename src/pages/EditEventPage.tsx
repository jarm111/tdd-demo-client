import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import {
  editEvent,
  resetEditEventLoading,
  removeEvent,
  resetRemoveEventLoading,
} from '../slices/eventsSlice'
import NewEvent from '../types/NewEvent'
import EventForm from '../components/EventForm/EventForm'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const EditEventPage = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const { events, editEventLoading, removeEventLoading } = useTypedSelector(
    (state) => state.events
  )
  const event = events.find((event) => event.id === id)

  useEffect(() => {
    if (editEventLoading === 'success') {
      dispatch(resetEditEventLoading())
      history.push('/')
    }
    if (removeEventLoading === 'success') {
      dispatch(resetRemoveEventLoading())
      history.push('/')
    }
  }, [dispatch, editEventLoading, removeEventLoading, history])

  const handleSubmit = (data: NewEvent) => {
    event && dispatch(editEvent({ ...event, ...data }))
  }

  const handleDelete = () => {
    event && dispatch(removeEvent(event))
  }

  const RemoveButton = (
    <button className="margin-top-small" onClick={handleDelete}>
      Remove event
    </button>
  )

  return (
    <div className="col">
      <h2>Edit event</h2>
      {event && <EventForm onSubmit={handleSubmit} event={event} />}
      {event && RemoveButton}
      <LoadingIndicator
        loading={
          editEventLoading === 'pending' || removeEventLoading === 'pending'
        }
      />
    </div>
  )
}

export default EditEventPage
