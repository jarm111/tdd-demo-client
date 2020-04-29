import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: Function
}

const EventForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, errors } = useForm({ mode: 'onBlur' })
  const mySubmit = handleSubmit((data) => {
    onSubmit(data)
  })

  return (
    <form onSubmit={mySubmit}>
      <label>Title</label>
      <input
        name="title"
        ref={register({
          required: { value: true, message: 'Title is required' },
          minLength: {
            value: 3,
            message: 'Title minimum length is 3 characters',
          },
          maxLength: {
            value: 100,
            message: 'Title maximum length is 100 characters',
          },
        })}
        aria-label="title-input"
        defaultValue=""
      />
      {errors.title && errors.title.message}
      <label>Date</label>
      <input
        name="date"
        ref={register({
          required: { value: true, message: 'Date is required' },
          pattern: {
            value: /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
            message: 'Date must be in format: yyyy-mm-dd',
          },
        })}
        aria-label="date-input"
      />
      {errors.date && errors.date.message}
      <label>Description</label>
      <input
        name="description"
        ref={register({
          required: { value: true, message: 'Description is required' },
          minLength: {
            value: 10,
            message: 'Description minimum length is 10 characters',
          },
          maxLength: {
            value: 500,
            message: 'Description maximum length is 500 characters',
          },
        })}
        aria-label="description-input"
      />
      {errors.description && errors.description.message}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default EventForm
