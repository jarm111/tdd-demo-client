import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type Props = {
  onSubmit: (data: Record<string, any>) => void
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
})

const SignupForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: schema,
  })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
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

export default SignupForm
