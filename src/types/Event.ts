import NewEvent from './NewEvent'

type Event = NewEvent &
  Readonly<{
    id: string
    user: string
  }>

export default Event
