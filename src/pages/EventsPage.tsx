import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTypedSelector } from '../store'
import EventList from '../components/EventList/EventList'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'

const EventsPage = () => {
  const history = useHistory()
  const { events, getEventsLoading } = useTypedSelector((state) => state.events)

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
