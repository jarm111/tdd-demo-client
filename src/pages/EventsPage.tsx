import React from 'react'
import { useTypedSelector } from '../store'
import { useHistory } from 'react-router-dom'
import EventList from '../components/EventList'

const EventsPage = () => {
  const history = useHistory()
  const events = useTypedSelector((state) => state.events)

  const handleClick = (eventId: string) => {
    history.push(`/event/${eventId}`)
  }

  return (
    <div>
      <h1>Events</h1>
      <EventList onClick={handleClick} events={events} />
    </div>
  )
}

export default EventsPage
