import React from 'react'

type Props = {
  title: string
  date: string
  description: string
}

const EventDetails = ({ title, date, description }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
      <div>{description}</div>
    </div>
  )
}

export default EventDetails
