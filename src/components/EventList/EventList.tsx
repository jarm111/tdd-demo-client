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
  const [ownEventsFilter, setOwnEventsFilter] = useState(false)

  const ownFilteredEvents =
    user && ownEventsFilter
      ? events.filter((event) => event.user === user.id)
      : events
  const titleFilteredEvents = titleFilter
    ? ownFilteredEvents.filter((event) =>
        event.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    : ownFilteredEvents
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
      <div className="row">
        <div className="col lg-2">
          <div className="form-group">
            <label htmlFor="order-select">Sort by date</label>
            <select
              name="order"
              id="order-select"
              aria-label="order-select"
              defaultValue={'asc'}
              onChange={(e) => setOrder(e.target.value as Order)}
            >
              <option value={'asc'}>Ascending</option>
              <option value={'desc'}>Descending</option>
            </select>
          </div>
        </div>
        <div className="col lg-2">
          <div className="form-group">
            <label htmlFor="filter-title-input">Search by title</label>
            <input
              type="text"
              id="filter-title-input"
              aria-label="filter-title-input"
              onChange={(e) => setTitleFilter(e.target.value)}
            />
          </div>
        </div>
        <div className="col lg-2">
          <div className="form-group">
            <label htmlFor="filter-category-select">Filter by category</label>
            <select
              id="filter-category-select"
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
          </div>
        </div>
        <div className="col lg-6">
          {user ? (
            <div className="form-group">
              <label className="paper-check" htmlFor="filter-own-checkbox">
                <input
                  id="filter-own-checkbox"
                  type="checkbox"
                  aria-label="filter-own-checkbox"
                  onChange={(e) => setOwnEventsFilter(e.target.checked)}
                />
                <span>Show own events only</span>
              </label>
            </div>
          ) : null}
        </div>
      </div>
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
