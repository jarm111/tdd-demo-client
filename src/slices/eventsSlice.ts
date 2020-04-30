import { createSlice } from '@reduxjs/toolkit'

const eventsSlice = createSlice({
  name: 'events',
  initialState: [],
  reducers: {
    addEvent: (state, action) => {
      state.push(action.payload)
    },
  },
})

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer
