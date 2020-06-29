import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import LoginForm from './LoginForm'
import { credentials } from '../../mocks/userMockData'

const setup = () => {
  const onSubmit = jest.fn()
  const result = render(<LoginForm onSubmit={onSubmit} />)
  return {
    onSubmit,
    result,
  }
}

test('form fill and submit', async () => {
  const {
    onSubmit,
    result: { getByLabelText, getByText },
  } = setup()

  const { email, password } = credentials

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
