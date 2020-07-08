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
      <div className="form-group">
        <label htmlFor="email-input">Email</label>
        <input
          name="email"
          ref={register}
          id="email-input"
          aria-label="email-input"
          defaultValue=""
        />
        <div className="text-danger">
          {errors.email && errors.email.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password-input">Password</label>
        <input
          type="password"
          name="password"
          ref={register}
          id="password-input"
          aria-label="password-input"
          defaultValue=""
        />
        <div className="text-danger">
          {errors.password && errors.password.message}
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default LoginForm
