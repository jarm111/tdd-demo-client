import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import EventForm from './EventForm'
import events from '../mocks/eventsMockData'

const setup = () => {
  const onSubmit = jest.fn()
  const result = render(<EventForm onSubmit={onSubmit} />)
  return {
    onSubmit,
    result,
  }
}

test('fills fields and calls submit with values', async () => {
  const [{ title, date, description, category }] = events

  const {
    onSubmit,
    result: { getByLabelText, getByText },
  } = setup()

  fireEvent.input(getByLabelText('title-input'), {
    target: { value: title },
  })
  fireEvent.input(getByLabelText('date-input'), {
    target: { value: date },
  })
  fireEvent.select(getByLabelText('category-select'), {
    target: { value: category },
  })
  fireEvent.input(getByLabelText('description-input'), {
    target: { value: description },
  })
  await act(async () => {
    fireEvent.click(getByText('Submit'))
  })

  expect(onSubmit).toHaveBeenCalledTimes(1)
  expect(onSubmit).toHaveBeenCalledWith({
    title,
    date,
    description,
    category,
  })
})

test('handles title validation errors', async () => {
  const longString = 'a'.repeat(101)
  const {
    result: { getByLabelText, getByText },
  } = setup()

  fireEvent.input(getByLabelText('title-input'), {
    target: { value: '' },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('title-input'))
  })

  getByText('title is a required', { exact: false })

  await act(async () => {
    fireEvent.input(getByLabelText('title-input'), {
      target: { value: 'a' },
    })
  })

  getByText('title must be at least', { exact: false })

  await act(async () => {
    fireEvent.input(getByLabelText('title-input'), {
      target: { value: longString },
    })
  })

  getByText('title must be at most', { exact: false })
})

test('handles date validation errors', async () => {
  const {
    result: { getByLabelText, getByText },
  } = setup()

  fireEvent.input(getByLabelText('date-input'), {
    target: { value: '' },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('date-input'))
  })

  getByText('date is a required', { exact: false })

  await act(async () => {
    fireEvent.input(getByLabelText('date-input'), {
      target: { value: '2020-05-1' },
    })
  })

  getByText('date must be in format', { exact: false })
})

test('handles description validation errors', async () => {
  const longString = 'a'.repeat(501)
  const {
    result: { getByLabelText, getByText },
  } = setup()

  fireEvent.input(getByLabelText('description-input'), {
    target: { value: '' },
  })

  await act(async () => {
    fireEvent.blur(getByLabelText('description-input'))
  })

  getByText('description is a required', { exact: false })

  await act(async () => {
    fireEvent.input(getByLabelText('description-input'), {
      target: { value: 'a' },
    })
  })

  getByText('description must be at least', { exact: false })

  await act(async () => {
    fireEvent.input(getByLabelText('description-input'), {
      target: { value: longString },
    })
  })

  getByText('description must be at most', { exact: false })
})

test('handles category select validation errors', async () => {
  const {
    result: { getByText },
  } = setup()

  await act(async () => {
    fireEvent.click(getByText('Submit'))
  })

  getByText('category is a required field', { exact: false })
})
