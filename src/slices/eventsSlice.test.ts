import { configureStore } from '@reduxjs/toolkit'
import events from './eventsSlice'

describe('eventsSlice', () => {
  it('returns empty array as initial state', () => {
    const store = configureStore({
      reducer: {
        events: events.reducer,
      },
    })

    const { events: eventsState } = store.getState()

    expect(eventsState).toEqual([])
  })
})
