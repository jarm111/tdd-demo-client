import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Credentials from '../../types/Credentials'

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
      <div className="form-group">
        <label htmlFor="retype-password-input">Retype password</label>
        <input
          type="password"
          name="retypePassword"
          ref={register}
          id="retype-password-input"
          aria-label="retype-password-input"
          defaultValue=""
        />
        <div className="text-danger">
          {errors.retypePassword && errors.retypePassword.message}
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SignupForm
