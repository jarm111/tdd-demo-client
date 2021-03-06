import Event from '../types/Event'
import NewEvent from '../types/NewEvent'
import { user } from './userMockData'

const eventsMockData: Event[] = [
  {
    id: '1',
    title: 'My event one',
    date: '2020-04-24',
    description: 'Welcome to my event one.',
    category: 'music',
    user: user.id,
  },
  {
    id: '2',
    title: 'My event two',
    date: '2020-04-25',
    description: 'Welcome to my event two.',
    category: 'lectures',
    user: 'id1',
  },
  {
    id: '3',
    title: 'My event three',
    date: '2020-04-26',
    description: 'Welcome to my event three.',
    category: 'sports',
    user: 'id2',
  },
]

export const newEvent: NewEvent = {
  title: 'My event four',
  date: '2020-04-27',
  description: 'Welcome to my event four.',
  category: 'dancing',
}

export default eventsMockData
