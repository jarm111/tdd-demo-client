import { createSlice } from '@reduxjs/toolkit'

type Event = Readonly<{
  id: number
  title: string
  date: string
  description: string
}>

const initialState: Event[] = []

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer
