import React from 'react'
import Event from '../../types/Event'

type Props = {
  event: Event
}

const EventDetails = ({
  event: { title, date, category, description },
}: Props) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>Category: {category}</p>
      <p>Description: {description}</p>
    </div>
  )
}

export default EventDetails
