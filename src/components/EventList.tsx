import React from 'react'
import EventItem from './EventItem'
import Event from '../types/Event'

type Props = {
  events: Event[]
}

const EventList = ({ events }: Props) => {
  return (
    <div>
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventList
