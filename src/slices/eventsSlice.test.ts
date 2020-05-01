import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import eventsReducer, { addEvent } from './eventsSlice'
import events from '../mocks/eventsMockData'

let store: EnhancedStore

describe('eventsSlice', () => {
  beforeEach(() => {
    store = configureStore({
      reducer: {
        events: eventsReducer,
      },
    })
  })

  it('returns empty array as initial state', () => {
    expect(store.getState().events).toEqual([])
  })

  it('adds new event', () => {
    const [event] = events

    store.dispatch(addEvent(event))
    expect(store.getState().events).toEqual([event])
  })
})
