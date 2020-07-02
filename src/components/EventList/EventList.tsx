import React from 'react'
import EventItem from '../EventItem/EventItem'
import Event from '../../types/Event'
import User from '../../types/User'

type Props = {
  events: Event[]
  onClick: (eventId: string) => void
  onEdit: (eventId: string) => void
  user: User | null
}

const EventList = ({ events, onClick, onEdit, user }: Props) => {
  return (
    <div>
      {events.map((event) => (
        <EventItem
          onClick={onClick}
          key={event.id}
          event={event}
          onEdit={onEdit}
          user={user}
        />
      ))}
    </div>
  )
}

export default EventList
