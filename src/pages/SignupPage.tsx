import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup } from '../slices/userSlice'
import { useTypedSelector } from '../store'
import SignupForm from '../components/SignupForm'
import LoadingIndicator from '../components/LoadingIndicator'
import Credentials from '../types/Credentials'

const SignupPage = () => {
  const { loading } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (loading === 'success') {
      history.push('/')
    }
  }, [loading, history])

  const handleSubmit = (data: Credentials) => {
    dispatch(signup(data))
  }

  return (
    <div>
      <h2>Create new account</h2>
      <SignupForm onSubmit={handleSubmit} />
      <LoadingIndicator loading={loading === 'pending'} />
    </div>
  )
}

export default SignupPage
