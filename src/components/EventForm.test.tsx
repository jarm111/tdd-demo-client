import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import EventForm from './EventForm'

describe('<EventForm/>', () => {
  it('finds input and calls submit', async () => {
    const onSubmit = jest.fn()
    const { getByText, getByLabelText } = render(
      <EventForm onSubmit={onSubmit} />
    )

    fireEvent.input(getByLabelText('title-input'), {
      target: { value: 'My new event' },
    })
    await act(async () => {
      fireEvent.click(getByText('Submit'))
    })

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
