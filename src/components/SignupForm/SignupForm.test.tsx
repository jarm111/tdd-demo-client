import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import SignupForm from './SignupForm'
import { credentials } from '../../mocks/userMockData'

const setup = () => {
  const onSubmit = jest.fn()
  const result = render(<SignupForm onSubmit={onSubmit} />)
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

  fireEvent.input(getByLabelText('retype-password-input'), {
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

test('email validation', async () => {
  const {
    result: { getByLabelText, getByText },
  } = setup()

  const badEmail = 'john.doe.email.com'

  await act(async () => {
    fireEvent.blur(getByLabelText('email-input'))
  })

  getByText('email is a required field', { exact: false })

  fireEvent.input(getByLabelText('email-input'), {
    target: { value: badEmail },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('email-input'))
  })

  getByText('must be a valid email', { exact: false })
})

test('password validation', async () => {
  const {
    result: { getByLabelText, getByText },
  } = setup()

  const shortPassword = 'short'

  await act(async () => {
    fireEvent.blur(getByLabelText('password-input'))
  })

  getByText('password is a required field', { exact: false })

  fireEvent.input(getByLabelText('password-input'), {
    target: { value: shortPassword },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('password-input'))
  })

  getByText('password must be at least', { exact: false })
})

test('retype password validation', async () => {
  const {
    result: { getByLabelText, getByText },
  } = setup()

  const { password } = credentials
  const wrongRetypedPassword = 'it-is-not-correct'

  fireEvent.input(getByLabelText('password-input'), {
    target: { value: password },
  })

  fireEvent.input(getByLabelText('retype-password-input'), {
    target: { value: wrongRetypedPassword },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('retype-password-input'))
  })

  getByText('retyped password does not match', { exact: false })
})
