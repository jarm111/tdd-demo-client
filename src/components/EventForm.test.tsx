import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import EventForm from './EventForm'

describe('<EventForm/>', () => {
  it('fills fields and calls submit with values', async () => {
    const [title, date, description] = [
      'My new event',
      '2020-04-28',
      'Everyone is welcome to my new event!',
    ]
    const onSubmit = jest.fn()
    const { getByText, getByLabelText } = render(
      <EventForm onSubmit={onSubmit} />
    )

    fireEvent.input(getByLabelText('title-input'), {
      target: { value: title },
    })
    fireEvent.input(getByLabelText('date-input'), {
      target: { value: date },
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
    })
  })

  it('handles title validation errors', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByLabelText } = render(
      <EventForm onSubmit={onSubmit} />
    )

    fireEvent.input(getByLabelText('title-input'), {
      target: { value: '' },
    })

    await act(async () => {
      fireEvent.blur(getByLabelText('title-input'))
    })

    getByText('Title is required', { exact: false })

    await act(async () => {
      fireEvent.input(getByLabelText('title-input'), {
        target: { value: 'a' },
      })
    })

    getByText('Title minimum length', { exact: false })

    await act(async () => {
      fireEvent.input(getByLabelText('title-input'), {
        target: { value: 'a'.repeat(101) },
      })
    })

    getByText('Title maximum length', { exact: false })
  })

  it('handles date validation errors', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByLabelText } = render(
      <EventForm onSubmit={onSubmit} />
    )

    fireEvent.input(getByLabelText('date-input'), {
      target: { value: '' },
    })

    await act(async () => {
      fireEvent.blur(getByLabelText('date-input'))
    })

    getByText('Date is required', { exact: false })

    await act(async () => {
      fireEvent.input(getByLabelText('date-input'), {
        target: { value: '2020-05-1' },
      })
    })

    getByText('Date must be in format', { exact: false })
  })

  it('handles description validation errors', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByLabelText } = render(
      <EventForm onSubmit={onSubmit} />
    )

    fireEvent.input(getByLabelText('description-input'), {
      target: { value: '' },
    })

    await act(async () => {
      fireEvent.blur(getByLabelText('description-input'))
    })

    getByText('Description is required', { exact: false })

    await act(async () => {
      fireEvent.input(getByLabelText('description-input'), {
        target: { value: 'a' },
      })
    })

    getByText('Description minimum length', { exact: false })

    await act(async () => {
      fireEvent.input(getByLabelText('description-input'), {
        target: { value: 'a'.repeat(501) },
      })
    })

    getByText('Description maximum length', { exact: false })
  })
})
