import React from 'react'
import Event from '../types/Event'

type Props = {
  event: Event
}

const EventDetails = ({ event: { title, date, description } }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
      <div>{description}</div>
    </div>
  )
}

export default EventDetails
