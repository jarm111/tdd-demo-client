import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useTypedSelector } from '../store'
import { getEvents } from '../slices/eventsSlice'
import EventList from '../components/EventList'
import LoadingIndicator from '../components/LoadingIndicator'

const EventsPage = () => {
  const history = useHistory()
  const { events, getEventsLoading } = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    if (getEventsLoading === 'idle') {
      dispatch(getEvents())
    }
  }, [dispatch, getEventsLoading])

  const handleClick = (eventId: string) => {
    history.push(`/event/${eventId}`)
  }

  return (
    <div>
      <h1>Events</h1>
      {getEventsLoading === 'pending' ? (
        <LoadingIndicator loading />
      ) : (
        <EventList onClick={handleClick} events={events} />
      )}
    </div>
  )
}

export default EventsPage
