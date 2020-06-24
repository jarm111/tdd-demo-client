import {
  createSlice,
  createAsyncThunk,
  combineReducers,
} from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import Event from '../types/Event'
import NewEvent from '../types/NewEvent'
import eventService from '../services/eventService'
import { RootState } from '../store'
import initLoadingReducer from './loadingSlice'

const [getEventsLoading, setGetEventsLoading] = initLoadingReducer('getEvents')
const [addEventLoading, setAddEventLoading] = initLoadingReducer('addEvent')

export const getEvents = createAsyncThunk<
  Event[],
  undefined,
  { rejectValue: Error }
>('events/get', async (_, thunkAPI) => {
  try {
    thunkAPI.dispatch(setGetEventsLoading('pending'))
    const data = await eventService.fetchEvents()
    thunkAPI.dispatch(setGetEventsLoading('success'))
    return data
  } catch (e) {
    thunkAPI.dispatch(setGetEventsLoading('failure'))
    toast(e.message, { type: 'error' })
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
    thunkAPI.dispatch(setAddEventLoading('pending'))
    const token = thunkAPI.getState().user.user?.token || ''

    const data = await eventService.createEvent(event, token)
    thunkAPI.dispatch(setAddEventLoading('success'))
    return data
  } catch (e) {
    thunkAPI.dispatch(setAddEventLoading('failure'))
    return thunkAPI.rejectWithValue(e.message)
  }
})

const eventsSlice = createSlice({
  name: 'events',
  initialState: [] as Event[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEvents.fulfilled, (_, { payload }) => {
      return payload
    })
    builder.addCase(addEvent.fulfilled, (state, { payload }) => {
      return state.concat(payload)
    })
  },
})

export default combineReducers({
  events: eventsSlice.reducer,
  getEventsLoading,
  addEventLoading,
})

export { setGetEventsLoading, setAddEventLoading }
