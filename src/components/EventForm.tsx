import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: Function
}

const EventForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const mySubmit = handleSubmit((data) => {
    console.log('form data', data)
    onSubmit(data)
  })

  return (
    <form onSubmit={mySubmit}>
      <label>Title</label>
      <input name="title" ref={register} aria-label="title-input" />
      <label>Date</label>
      <input name="date" ref={register} aria-label="date-input" />
      <label>Description</label>
      <input name="description" ref={register} aria-label="description-input" />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default EventForm
