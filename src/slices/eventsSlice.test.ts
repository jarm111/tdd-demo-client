import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import eventsReducer, {
  getEvents,
  addEvent,
  editEvent,
  removeEvent,
} from './eventsSlice'
import events, { newEvent } from '../mocks/eventsMockData'
import userReducer from './userSlice'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const setup = () =>
  configureStore({
    reducer: {
      events: eventsReducer,
      user: userReducer,
    },
  })

const initEvents = async (store: ReturnType<typeof setup>) => {
  mockedAxios.get.mockResolvedValue({
    data: events,
  })

  await store.dispatch(getEvents())
}

test('correct initial state', () => {
  const store = setup()
  const initialState = {
    events: [],
    getEventsLoading: 'idle',
    addEventLoading: 'idle',
    editEventLoading: 'idle',
    removeEventLoading: 'idle',
  }

  expect(store.getState().events).toEqual(initialState)
})

test('get events', async () => {
  const store = setup()

  const response = {
    data: events,
  }

  const endState = {
    events,
    getEventsLoading: 'success',
  }

  mockedAxios.get.mockResolvedValue(response)

  await store.dispatch(getEvents())

  expect(store.getState().events).toMatchObject(endState)
})

test('pending get events', () => {
  const store = setup()

  const response = {
    data: events,
  }

  const endState = {
    events: [],
    getEventsLoading: 'pending',
  }

  mockedAxios.get.mockResolvedValue(response)

  Promise.allSettled([
    store.dispatch(getEvents()),
    expect(store.getState().events).toMatchObject(endState),
  ])
})

test('rejected get events', async () => {
  const store = setup()

  const endState = {
    events: [],
    getEventsLoading: 'failure',
  }

  mockedAxios.get.mockRejectedValue({})

  await store.dispatch(getEvents())

  expect(store.getState().events).toMatchObject(endState)
})

test('add new event', async () => {
  const store = setup()
  const eventWithId = {
    ...newEvent,
    id: '4',
  }

  const response = {
    data: eventWithId,
  }

  const endState = {
    events: [eventWithId],
    addEventLoading: 'success',
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(addEvent(newEvent))

  expect(store.getState().events).toMatchObject(endState)
})

test('pending add event', () => {
  const store = setup()

  const endState = {
    events: [],
    addEventLoading: 'pending',
  }

  mockedAxios.post.mockResolvedValue({})

  Promise.allSettled([
    store.dispatch(addEvent(newEvent)),
    expect(store.getState().events).toMatchObject(endState),
  ])
})

test('failed add event', async () => {
  const store = setup()

  const endState = {
    events: [],
    addEventLoading: 'failure',
  }

  mockedAxios.post.mockRejectedValue({})

  await store.dispatch(addEvent(newEvent))

  expect(store.getState().events).toMatchObject(endState)
})

test('edit event', async () => {
  const store = setup()
  await initEvents(store)

  const [eventToModify] = store.getState().events.events
  const modifiedEvent = { ...eventToModify, title: 'My edited title' }

  mockedAxios.put.mockResolvedValue({
    data: modifiedEvent,
  })

  await store.dispatch(editEvent(modifiedEvent))

  expect(store.getState().events.events).not.toContain(eventToModify)
  expect(store.getState().events.events).toContain(modifiedEvent)
  expect(store.getState().events.editEventLoading).toEqual('success')
})

test('pending edit event', async () => {
  const store = setup()
  await initEvents(store)

  const [eventToModify] = store.getState().events.events
  const modifiedEvent = { ...eventToModify, title: 'My edited title' }

  mockedAxios.put.mockResolvedValue({})

  Promise.allSettled([
    store.dispatch(editEvent(modifiedEvent)),
    expect(store.getState().events.editEventLoading).toEqual('pending'),
  ])
})

test('failed edit event', async () => {
  const store = setup()
  await initEvents(store)

  const eventsAtStart = store.getState().events.events
  const [eventToModify] = eventsAtStart
  const modifiedEvent = { ...eventToModify, title: 'Fail' }

  mockedAxios.put.mockRejectedValue({})

  await store.dispatch(editEvent(modifiedEvent))

  expect(store.getState().events.events).toEqual(eventsAtStart)
  expect(store.getState().events.editEventLoading).toEqual('failure')
})

test('remove event', async () => {
  const store = setup()
  await initEvents(store)

  const [eventToDelete] = store.getState().events.events

  mockedAxios.delete.mockResolvedValue({})

  await store.dispatch(removeEvent(eventToDelete))

  const eventsAfterDelete = store.getState().events.events

  expect(eventsAfterDelete).not.toContain(eventToDelete)
  expect(store.getState().events.removeEventLoading).toEqual('success')
})

test('pending remove event', async () => {
  const store = setup()
  await initEvents(store)

  const [eventToDelete] = store.getState().events.events

  mockedAxios.delete.mockResolvedValue({})

  Promise.allSettled([
    store.dispatch(removeEvent(eventToDelete)),
    expect(store.getState().events.removeEventLoading).toEqual('pending'),
  ])
})

test('failed remove event', async () => {
  const store = setup()
  await initEvents(store)

  const eventsAtStart = store.getState().events.events

  const [eventToDelete] = eventsAtStart

  mockedAxios.delete.mockRejectedValue({})

  await store.dispatch(removeEvent(eventToDelete))

  const eventsAfterDelete = store.getState().events.events

  expect(eventsAfterDelete).toEqual(eventsAtStart)
  expect(store.getState().events.removeEventLoading).toEqual('failure')
})
