import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: (data: Record<string, any>) => void
}

const SignupForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit } = useForm({
    mode: 'onBlur',
  })

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <input
        type="email"
        name="email"
        ref={register}
        aria-label="email-input"
        defaultValue=""
      />
      <input
        type="password"
        name="password"
        ref={register}
        aria-label="password-input"
        defaultValue=""
      />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default SignupForm
