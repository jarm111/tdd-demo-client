import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import eventsReducer, { addEvent } from './eventsSlice'

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
    const event = {
      id: 1,
      title: 'My example event',
      date: '2020-04-30',
      description: 'Welcome to my new event',
    }

    store.dispatch(addEvent(event))
    expect(store.getState().events).toEqual([event])
  })
})
