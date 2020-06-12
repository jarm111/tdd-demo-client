import React from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTypedSelector } from './store'
import { logout } from './slices/userSlice'
import EventsPaige from './pages/EventsPaige'
import CreateEventPage from './pages/CreateEventPage'
import EventDetailsPage from './pages/EventDetailsPage'
import Navigation from './components/Navigation'
import SignupPage from './pages/SignupPage'

const App = () => {
  const user = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  return (
    <>
      <ToastContainer />
      <Navigation
        isLoggedIn={Boolean(user)}
        onLogout={() => dispatch(logout())}
      />
      <Switch>
        <Route exact path={'/'}>
          <EventsPaige />
        </Route>
        <Route path={'/create'}>
          <CreateEventPage />
        </Route>
        <Route path={'/event/:id'}>
          <EventDetailsPage />
        </Route>
        <Route path={'/signup'}>
          <SignupPage />
        </Route>
      </Switch>
    </>
  )
}

export default App
