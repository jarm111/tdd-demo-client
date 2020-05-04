import Category from './Category'

type Event = Readonly<{
  id: string
  title: string
  date: string
  description: string
  category: Category
}>

export default Event
