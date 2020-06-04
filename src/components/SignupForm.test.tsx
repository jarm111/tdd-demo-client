import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import SignupForm from './SignupForm'

test('form fill and submit', async () => {
  const onSubmit = jest.fn()
  const { getByText, getByLabelText } = render(
    <SignupForm onSubmit={onSubmit} />
  )
  const email = 'john.doe@email.com'
  const password = 'password123'

  fireEvent.input(getByLabelText('email-input'), {
    target: { value: email },
  })

  fireEvent.input(getByLabelText('password-input'), {
    target: { value: password },
  })

  await act(async () => {
    fireEvent.click(getByText('Submit'))
  })

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    email,
    password,
  })
})
