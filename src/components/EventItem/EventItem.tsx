import React from 'react'
import Event from '../../types/Event'
import User from '../../types/User'

type Props = {
  event: Event
  onClick: (eventId: string) => void
  onEdit: (eventId: string) => void
  user: User | null
}

const EventItem = ({ event, onClick, onEdit, user }: Props) => {
  const { title, date, category, id } = event

  const handleEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    onEdit(event.id)
  }

  const editButton = (
    <button className="btn-small" onClick={handleEdit}>
      Edit
    </button>
  )

  return (
    <div className="card margin-bottom-small" onClick={() => onClick(id)}>
      <div className="card-body">
        <h4 className="card-title">{title}</h4>
        <h5 className="card-subtitle">{date}</h5>
        <p className="card-text">{category}</p>
        {user && user.id === event.user ? editButton : null}
      </div>
    </div>
  )
}

export default EventItem
