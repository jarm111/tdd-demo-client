import React from 'react'
import Event from '../types/Event'

type Props = {
  event: Event
}

const EventDetails = ({
  event: { title, date, category, description },
}: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>{date}</div>
      <div>{category}</div>
      <div>{description}</div>
    </div>
  )
}

export default EventDetails
