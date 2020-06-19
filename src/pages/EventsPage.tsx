import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import { getEvents } from '../slices/eventsSlice'
import EventList from '../components/EventList'
import LoadingIndicator from '../components/LoadingIndicator'

const EventsPage = () => {
  const history = useHistory()
  const { events, loading } = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  const handleClick = (eventId: string) => {
    history.push(`/event/${eventId}`)
  }

  return (
    <div>
      <h1>Events</h1>
      {loading ? (
        <LoadingIndicator loading />
      ) : (
        <EventList onClick={handleClick} events={events} />
      )}
    </div>
  )
}

export default EventsPage
