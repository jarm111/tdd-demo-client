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

  const editButton = <button onClick={handleEdit}>Edit</button>

  return (
    <div onClick={() => onClick(id)}>
      <div>{title}</div>
      <div>{date}</div>
      <div>{category}</div>
      {user && user.id === event.user ? editButton : null}
    </div>
  )
}

export default EventItem
