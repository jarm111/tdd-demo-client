import React from 'react'
import Event from '../../types/Event'

type Props = {
  event: Event
  onClick: Function
}

const EventItem = ({
  event: { title, date, category, id },
  onClick,
}: Props) => {
  return (
    <div onClick={() => onClick(id)}>
      <div>{title}</div>
      <div>{date}</div>
      <div>{category}</div>
    </div>
  )
}

export default EventItem
