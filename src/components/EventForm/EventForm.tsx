import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ALL_CATEGORIES } from '../../types/Category'
import NewEvent from '../../types/NewEvent'

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(100),
  date: yup
    .string()
    .required()
    .matches(
      /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
      'date must be in format: yyyy-mm-dd'
    ),
  description: yup.string().required().min(10).max(500),
  category: yup.string().required(),
})

type Props = {
  onSubmit: (data: NewEvent) => void
  event?: NewEvent
}

const EventForm = ({ onSubmit, event }: Props) => {
  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    validationSchema: schema,
  })

  const getDefaultValue = (key: keyof NewEvent) => (event ? event[key] : '')

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data as NewEvent))}>
      <label>Title</label>
      <input
        name="title"
        ref={register}
        aria-label="title-input"
        defaultValue={getDefaultValue('title')}
      />
      {errors.title && errors.title.message}
      <label>Date</label>
      <input
        name="date"
        ref={register}
        aria-label="date-input"
        defaultValue={getDefaultValue('date')}
      />
      {errors.date && errors.date.message}
      <label>Category</label>
      <select
        name="category"
        ref={register}
        aria-label="category-select"
        defaultValue={getDefaultValue('category')}
      >
        <option value="">--Select--</option>
        {ALL_CATEGORIES.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      {errors.category && errors.category.message}
      <label>Description</label>
      <input
        name="description"
        ref={register}
        aria-label="description-input"
        defaultValue={getDefaultValue('description')}
      />
      {errors.description && errors.description.message}
      <input type="submit" value="Submit" />
    </form>
  )
}

export default EventForm
