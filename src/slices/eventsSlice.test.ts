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

test('returns correct initial state', () => {
  const store = setup()
  const initialState = {
    events: [],
    getEventsLoading: false,
    addEventLoading: false,
  }

  expect(store.getState().events).toEqual(initialState)
})

test('gets events', async () => {
  const store = setup()

  const response = {
    data: events,
  }

  const endState = {
    events,
    getEventsLoading: false,
    addEventLoading: false,
  }

  mockedAxios.get.mockResolvedValue(response)

  await store.dispatch(getEvents())

  expect(store.getState().events).toEqual(endState)
})

test('pending get events', () => {
  const store = setup()

  const response = {
    data: events,
  }

  const endState = {
    events: [],
    getEventsLoading: true,
    addEventLoading: false,
  }

  mockedAxios.get.mockResolvedValue(response)

  store.dispatch(getEvents())

  expect(store.getState().events).toEqual(endState)
})

test('adds new event', async () => {
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
    getEventsLoading: false,
    addEventLoading: false,
  }

  mockedAxios.post.mockResolvedValue(response)

  await store.dispatch(addEvent(newEvent))

  expect(store.getState().events).toEqual(endState)
})

test('pending add event', async () => {
  const store = setup()

  const endState = {
    events: [],
    getEventsLoading: false,
    addEventLoading: true,
  }

  mockedAxios.post.mockResolvedValue({})

  store.dispatch(addEvent(newEvent))

  expect(store.getState().events).toEqual(endState)
})
