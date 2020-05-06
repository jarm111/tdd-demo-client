import { configureStore } from '@reduxjs/toolkit'
import eventsReducer, { addEvent } from './eventsSlice'
import events from '../mocks/eventsMockData'

const setup = () =>
  configureStore({
    reducer: {
      events: eventsReducer,
    },
  })

test('returns empty array as initial state', () => {
  const store = setup()

  expect(store.getState().events).toEqual([])
})

test('adds new event', () => {
  const [event] = events
  const store = setup()

  store.dispatch(addEvent(event))

  expect(store.getState().events).toEqual([event])
})
