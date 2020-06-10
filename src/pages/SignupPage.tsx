import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { signup } from '../slices/userSlice'
import SignupForm from '../components/SignupForm'

const SignupPage = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleSubmit = (data: any) => {
    dispatch(signup(data))
    history.push('/')
  }

  return (
    <div>
      <h2>Create new account</h2>
      <SignupForm onSubmit={handleSubmit} />
    </div>
  )
}

export default SignupPage
