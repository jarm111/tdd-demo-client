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
})
