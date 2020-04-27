import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {
  onSubmit: Function
}

const EventForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const mySubmit = handleSubmit(() => {
    onSubmit()
  })

  return (
    <form onSubmit={mySubmit}>
      <label>Title</label>
      <input name="title" ref={register} aria-label="title-input" />
      <input type="submit" value="Submit" />
    </form>
  )
}

export default EventForm
