import NewEvent from './NewEvent'

type Event = NewEvent &
  Readonly<{
    id: string
  }>

export default Event
