import React from 'react'
import EventItem from './EventItem'

type Event = Readonly<{
  id: string
  title: string
  date: string
}>

type Props = {
  events: readonly Event[]
}

const EventList = ({ events }: Props) => {
  return (
    <div>
      {events.map(({ id, title, date }) => (
        <EventItem key={id} title={title} date={date} />
      ))}
    </div>
  )
}

export default EventList
