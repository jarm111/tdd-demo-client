import React from 'react'
import EventItem from '../EventItem/EventItem'
import Event from '../../types/Event'

type Props = {
  events: Event[]
  onClick: Function
}

const EventList = ({ events, onClick }: Props) => {
  return (
    <div>
      {events.map((event) => (
        <EventItem onClick={onClick} key={event.id} event={event} />
      ))}
    </div>
  )
}

export default EventList
