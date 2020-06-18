import { configureStore } from '@reduxjs/toolkit'
import axios from 'axios'
import eventsReducer, { addEvent, getEvents } from './eventsSlice'
import events from '../mocks/eventsMockData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const setup = () =>
  configureStore({
    reducer: {
      events: eventsReducer,
    },
  })

test('returns correct initial state', () => {
  const store = setup()
  const initialState = {
    events: [],
    loading: false,
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
    loading: false,
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

  const endState = { loading: true, events: [] }

  mockedAxios.get.mockResolvedValue(response)

  store.dispatch(getEvents())

  expect(store.getState().events).toEqual(endState)
})

test('adds new event', () => {
  const [event] = events
  const store = setup()
  const endState = { loading: false, events: [event] }

  store.dispatch(addEvent(event))

  expect(store.getState().events).toEqual(endState)
})
