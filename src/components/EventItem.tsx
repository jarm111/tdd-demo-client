import React from 'react'
import Event from '../types/Event'

type Props = {
  event: Event
}

const EventItem = ({ event: { title, date } }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
    </div>
  )
}

export default EventItem
