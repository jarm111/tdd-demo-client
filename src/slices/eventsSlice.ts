import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Event from '../types/Event'
import NewEvent from '../types/NewEvent'
import eventService from '../services/eventService'
import { RootState } from '../store'
import Loading from '../types/Loading'

type State = {
  events: Event[]
  getEventsLoading: Loading
  addEventLoading: Loading
  editEventLoading: Loading
  removeEventLoading: Loading
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

export const editEvent = createAsyncThunk<
  Event,
  Event,
  {
    rejectValue: Error
    state: RootState
  }
>('events/edit', async (event, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user?.token || ''
    const data = await eventService.modifyEvent(event, token)
    return data
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

export const removeEvent = createAsyncThunk<
  Event,
  Event,
  {
    rejectValue: Error
    state: RootState
  }
>('events/remove', async (event, thunkAPI) => {
  try {
    const token = thunkAPI.getState().user.user?.token || ''
    await eventService.deleteEvent(event.id, token)
    return event
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message)
  }
})

const initialState: State = {
  events: [],
  getEventsLoading: 'idle',
  addEventLoading: 'idle',
  editEventLoading: 'idle',
  removeEventLoading: 'idle',
}

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    resetAddEventLoading: (state) => {
      state.addEventLoading = 'idle'
    },
    resetEditEventLoading: (state) => {
      state.editEventLoading = 'idle'
    },
    resetRemoveEventLoading: (state) => {
      state.removeEventLoading = 'idle'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEvents.pending, (state) => {
      state.getEventsLoading = 'pending'
    })
    builder.addCase(getEvents.fulfilled, (state, { payload }) => {
      state.getEventsLoading = 'success'
      state.events = payload
    })
    builder.addCase(getEvents.rejected, (state, { payload }) => {
      state.getEventsLoading = 'failure'
      toast(payload, { type: 'error' })
    })

    builder.addCase(addEvent.pending, (state) => {
      state.addEventLoading = 'pending'
    })
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      state.addEventLoading = 'success'
      state.events.push(payload)
      toast(`Created new event: ${payload.title}`)
    })
    builder.addCase(addEvent.rejected, (state, { payload }) => {
      state.addEventLoading = 'failure'
      toast(payload, { type: 'error' })
    })

    builder.addCase(editEvent.pending, (state) => {
      state.editEventLoading = 'pending'
    })
    builder.addCase(editEvent.fulfilled, (state, { payload }) => {
      state.editEventLoading = 'success'
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event
      )
      toast(`Edited event: ${payload.title}`)
    })
    builder.addCase(editEvent.rejected, (state, { payload }) => {
      state.editEventLoading = 'failure'
      toast(payload, { type: 'error' })
    })

    builder.addCase(removeEvent.pending, (state) => {
      state.removeEventLoading = 'pending'
    })
    builder.addCase(removeEvent.fulfilled, (state, { payload }) => {
      state.removeEventLoading = 'success'
      state.events = state.events.filter((event) => event.id !== payload.id)
      toast(`Removed event: ${payload.title}`)
    })
    builder.addCase(removeEvent.rejected, (state, { payload }) => {
      state.removeEventLoading = 'failure'
      toast(payload, { type: 'error' })
    })
  },
})

export default eventsSlice.reducer

export const {
  resetAddEventLoading,
  resetEditEventLoading,
  resetRemoveEventLoading,
} = eventsSlice.actions
