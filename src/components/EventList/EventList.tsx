import React, { useState } from 'react'
import EventItem from '../EventItem/EventItem'
import Event from '../../types/Event'
import User from '../../types/User'

type Props = {
  events: Event[]
  onClick: (eventId: string) => void
  onEdit: (eventId: string) => void
  user: User | null
}

type Order = 'asc' | 'desc'

const EventList = ({ events, onClick, onEdit, user }: Props) => {
  const [order, setOrder] = useState<Order>('asc')

  const sortedEvents = events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
  const orderedEvents =
    order === 'desc' ? sortedEvents.slice().reverse() : sortedEvents

  return (
    <div>
      <label>Sort by date</label>
      <select
        name="order"
        aria-label="order-select"
        defaultValue={'asc'}
        onChange={(e) => setOrder(e.target.value as Order)}
      >
        <option value={'asc'}>Ascending</option>
        <option value={'desc'}>Descending</option>
      </select>
      <div>
        {orderedEvents.map((event) => (
          <EventItem
            onClick={onClick}
            key={event.id}
            event={event}
            onEdit={onEdit}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default EventList
