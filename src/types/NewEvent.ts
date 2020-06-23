import Category from './Category'

type NewEvent = Readonly<{
  title: string
  date: string
  description: string
  category: Category
}>

export default NewEvent
