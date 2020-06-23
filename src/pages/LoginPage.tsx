import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { login } from '../slices/userSlice'
import { useTypedSelector } from '../store'
import LoginForm from '../components/LoginForm'
import LoadingIndicator from '../components/LoadingIndicator'
import Credentials from '../types/Credentials'

const LoginPage = () => {
  const { loading } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (data: Credentials) => {
    dispatch(login(data))
  }

  if (loading === 'succeeded') {
    history.push('/')
  }

  return (
    <div>
      <h2>Log in</h2>
      <LoginForm onSubmit={handleSubmit} />
      <Link to="/signup">Sign up</Link>
      <LoadingIndicator loading={loading === 'pending'} />
    </div>
  )
}

export default LoginPage
