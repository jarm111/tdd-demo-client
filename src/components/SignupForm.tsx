import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Credentials from '../types/Credentials'

type Props = {
  onSubmit: (credentials: Credentials) => void
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
  retypePassword: yup
    .string()
    .required()
    .test(
      'equals-password',
      'Retyped password does not match password',
      function (value) {
        return value === this.parent.password
      }
    ),
})

const SignupForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: schema,
  })

  const filterSubmitValue = (data: Record<string, any>) => {
    const { email, password } = data
    onSubmit({
      email,
      password,
    })
  }

  return (
    <form onSubmit={handleSubmit(filterSubmitValue)}>
      <label>Email</label>
      <input
        name="email"
        ref={register}
        aria-label="email-input"
        defaultValue=""
      />
      {errors.email && errors.email.message}
      <label>Password</label>
      <input
        type="password"
        name="password"
        ref={register}
        aria-label="password-input"
        defaultValue=""
      />
      {errors.password && errors.password.message}
      <label>Retype password</label>
      <input
        type="password"
        name="retypePassword"
        ref={register}
        aria-label="retype-password-input"
        defaultValue=""
      />
      {errors.retypePassword && errors.retypePassword.message}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SignupForm
