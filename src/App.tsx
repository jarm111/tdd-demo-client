import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTypedSelector } from './store'
import { logout } from './slices/userSlice'
import { getEvents } from './slices/eventsSlice'
import EventsPage from './pages/EventsPage'
import CreateEventPage from './pages/CreateEventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import Navigation from './components/Navigation/Navigation'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import EditEventPage from './pages/EditEventPage'

const App = () => {
  const { user } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  return (
    <>
      <ToastContainer />
      <Navigation
        isLoggedIn={Boolean(user)}
        onLogout={() => dispatch(logout())}
      />
      <Switch>
        <Route exact path={'/'}>
          <EventsPage />
        </Route>
        <Route path={'/create'}>
          <CreateEventPage />
        </Route>
        <Route path={'/event/:id'}>
          <EventDetailsPage />
        </Route>
        <Route path={'/eventedit/:id'}>
          <EditEventPage />
        </Route>
        <Route path={'/signup'}>
          <SignupPage />
        </Route>
        <Route path={'/login'}>
          <LoginPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
