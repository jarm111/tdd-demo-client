import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import eventsReducer from './slices/eventsSlice'
import userReducer, { initUser } from './slices/userSlice'

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
})

const store = configureStore({
  reducer: rootReducer,
})

store.dispatch(initUser())

type RootState = ReturnType<typeof rootReducer>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
