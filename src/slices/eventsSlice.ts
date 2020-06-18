import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Event from '../types/Event'
import eventService from '../services/eventService'

type State = {
  events: Event[]
  loading: boolean
}

const initialState: State = {
  events: [],
  loading: false,
}

export const getEvents = createAsyncThunk<
  Event[],
  undefined,
  { rejectValue: Error }
>('events/get', async (_, thunkAPI) => {
  try {
    const data = await eventService.fetchEvents()
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      return {
        loading: false,
        events: state.events.concat(payload),
      }
    })
    builder.addCase(getEvents.pending, (state) => {
      return { ...state, loading: true }
    })
    builder.addCase(getEvents.rejected, (state, { payload }) => {
      toast(payload, { type: 'error' })
      return {
        events: state.events,
        loading: false,
      }
    })
  },
})

export const { addEvent } = eventsSlice.actions

export default eventsSlice.reducer
