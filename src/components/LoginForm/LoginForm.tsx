import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Credentials from '../../types/Credentials'

type Props = {
  onSubmit: (data: Credentials) => void
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
})

const LoginForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: schema,
  })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as Credentials))}>
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
      <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm
