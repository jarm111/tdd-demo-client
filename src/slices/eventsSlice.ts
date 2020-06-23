import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Event from '../types/Event'
import NewEvent from '../types/NewEvent'
import eventService from '../services/eventService'
import { RootState } from '../store'

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

export const addEvent = createAsyncThunk<
  Event,
  NewEvent,
  {
    rejectValue: Error
    state: RootState
  }
>('events/create', async (event, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user?.token || ''

    const data = await eventService.createEvent(event, token)
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      return {
        loading: false,
        events: payload,
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
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      return {
        ...state,
        events: state.events.concat(payload),
      }
    })
  },
})

export default eventsSlice.reducer
