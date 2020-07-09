import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addEvent, resetAddEventLoading } from '../slices/eventsSlice'
import EventForm from '../components/EventForm/EventForm'
import NewEvent from '../types/NewEvent'
import { useTypedSelector } from '../store'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const CreateEventPage = () => {
  const { addEventLoading } = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (addEventLoading === 'success') {
      dispatch(resetAddEventLoading())
      history.push('/')
    }
  }, [dispatch, addEventLoading, history])

  const handleSubmit = (data: NewEvent) => {
    dispatch(addEvent(data))
  }

  return (
    <div className="col">
      <h2>Create new event</h2>
      <EventForm onSubmit={handleSubmit} />
      <LoadingIndicator loading={addEventLoading === 'pending'} />
    </div>
  )
}

export default CreateEventPage
