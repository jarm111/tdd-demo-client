import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import eventsReducer, { getEvents, addEvent } from './eventsSlice'
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

test('correct initial state', () => {
  const store = setup()
  const initialState = {
    events: [],
    getEventsLoading: 'idle',
    addEventLoading: 'idle',
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
