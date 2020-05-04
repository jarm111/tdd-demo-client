import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import EventForm from './EventForm'
import events from '../mocks/eventsMockData'

const setupComponent = () => {
  const onSubmit = jest.fn()
  const result = render(<EventForm onSubmit={onSubmit} />)
  return {
    onSubmit,
    result,
  }
}

describe('<EventForm/>', () => {
  it('fills fields and calls submit with values', async () => {
    const [{ title, date, description, category }] = events

    const {
      onSubmit,
      result: { getByLabelText, getByText },
    } = setupComponent()

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

  it('handles title validation errors', async () => {
    const {
      result: { getByLabelText, getByText },
    } = setupComponent()

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
        target: { value: 'a'.repeat(101) },
      })
    })

    getByText('title must be at most', { exact: false })
  })

  it('handles date validation errors', async () => {
    const {
      result: { getByLabelText, getByText },
    } = setupComponent()

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

  it('handles description validation errors', async () => {
    const {
      result: { getByLabelText, getByText },
    } = setupComponent()

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
        target: { value: 'a'.repeat(501) },
      })
    })

    getByText('description must be at most', { exact: false })
  })
})
