import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import { login } from '../slices/userSlice'
import { useTypedSelector } from '../store'
import LoginForm from '../components/LoginForm/LoginForm'
import LoadingIndicator from '../components/LoadingIndicator/LoadingIndicator'
import Credentials from '../types/Credentials'

const LoginPage = () => {
  const { loading } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (loading === 'success') {
      history.push('/')
    }
  }, [loading, history])

  const handleSubmit = (data: Credentials) => {
    dispatch(login(data))
  }

  return (
    <div className="col">
      <h2>Log in</h2>
      <LoginForm onSubmit={handleSubmit} />
      <LoadingIndicator loading={loading === 'pending'} />
      <div className="margin-top-large">
        <Link to="/signup">Sign Up instead...</Link>
      </div>
    </div>
  )
}

export default LoginPage
