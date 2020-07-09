import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'
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
  const { events } = useTypedSelector((state) => state.events)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  const RedirectHome = () => <Redirect to={'/'} />

  const renderEditEvent = ({ match }: RouteComponentProps<{ id: string }>) => {
    const event = events.find((event) => event.id === match.params.id)
    return user && event && user.id === event.user ? (
      <EditEventPage />
    ) : (
      <RedirectHome />
    )
  }

  return (
    <>
      <ToastContainer />
      <Navigation
        isLoggedIn={Boolean(user)}
        onLogout={() => dispatch(logout())}
      />
      <div className="row flex-center">
        <Switch>
          <Route exact path={'/'}>
            <EventsPage />
          </Route>
          <Route path={'/create'}>
            {user ? <CreateEventPage /> : <RedirectHome />}
          </Route>
          <Route path={'/event/:id'}>
            <EventDetailsPage />
          </Route>
          <Route path={'/eventedit/:id'} render={renderEditEvent} />
          <Route path={'/signup'}>
            <SignupPage />
          </Route>
          <Route path={'/login'}>
            <LoginPage />
          </Route>
        </Switch>
      </div>
    </>
  )
}

export default App
