import React, { useState } from 'react'
import EventItem from '../EventItem/EventItem'
import Event from '../../types/Event'
import User from '../../types/User'
import Category, { ALL_CATEGORIES } from '../../types/Category'

type Props = {
  events: Event[]
  onClick: (eventId: string) => void
  onEdit: (eventId: string) => void
  user: User | null
}

type Order = 'asc' | 'desc'

const EventList = ({ events, onClick, onEdit, user }: Props) => {
  const [order, setOrder] = useState<Order>('asc')
  const [titleFilter, setTitleFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<Category | ''>('')

  const titleFilteredEvents = titleFilter
    ? events.filter((event) =>
        event.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    : events
  const categoryFilteredEvents = categoryFilter
    ? titleFilteredEvents.filter((event) => event.category === categoryFilter)
    : titleFilteredEvents
  const sortedEvents = categoryFilteredEvents
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

      <label>Search by title</label>
      <input
        type="text"
        aria-label="filter-title-input"
        onChange={(e) => setTitleFilter(e.target.value)}
      />

      <label>Filter by category</label>
      <select
        aria-label="filter-category-select"
        defaultValue=""
        onChange={(e) => setCategoryFilter(e.target.value as Category)}
      >
        <option value="">--ALL--</option>
        {ALL_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
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
