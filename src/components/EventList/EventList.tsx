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

  const filterEvents = (events: Readonly<Event[]>): Event[] => {
    let filteredEvents = events.slice()

    if (user && ownEventsFilter) {
      filteredEvents = filteredEvents.filter((event) => event.user === user.id)
    }

    if (titleFilter) {
      filteredEvents = filteredEvents.filter((event) =>
        event.title.toLowerCase().includes(titleFilter.toLowerCase())
      )
    }

    if (categoryFilter) {
      filteredEvents = filteredEvents.filter(
        (event) => event.category === categoryFilter
      )
    }

    filteredEvents.sort((a, b) => a.date.localeCompare(b.date))
    order === 'desc' && filteredEvents.reverse()
    return filteredEvents
  }

  return (
    <div>
      <div className="row">
        <div className="col ">
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
        <div className="col ">
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
        <div className="col ">
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
        <div className="col">
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
        {filterEvents(events).map((event) => (
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
