import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Event from '../types/Event'

const initialState: Event[] = []

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.push(action.payload)
    },
  },
})

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer
