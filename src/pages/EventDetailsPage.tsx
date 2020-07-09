import React from 'react'
import { useParams } from 'react-router-dom'
import { useTypedSelector } from '../store'
import EventDetails from '../components/EventDetails/EventDetails'

const EventDetailsPage = () => {
  const { id } = useParams()
  const { events } = useTypedSelector((state) => state.events)

  const event = events.find((event) => event.id === id)

  return event ? (
    <div className="col-fill col">
      <EventDetails event={event} />
    </div>
  ) : null
}

export default EventDetailsPage
