import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup } from '../slices/userSlice'
import { useTypedSelector } from '../store'
import SignupForm from '../components/SignupForm'
import LoadingIndicator from '../components/LoadingIndicator'

const SignupPage = () => {
  const { loading } = useTypedSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (data: any) => {
    dispatch(signup(data))
  }

  if (loading === 'succeeded') {
    history.push('/')
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
