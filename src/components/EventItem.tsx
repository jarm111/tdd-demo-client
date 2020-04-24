import React from 'react'

type Props = {
  title: string
  date: string
}

const EventItem = ({ title, date }: Props) => {
  return (
    <div>
      <div>{title}</div>
      <div>{date}</div>
    </div>
  )
}

export default EventItem
