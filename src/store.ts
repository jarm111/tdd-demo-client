import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import eventsReducer from './slices/eventsSlice'

const rootReducer = combineReducers({
  events: eventsReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
