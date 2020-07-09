import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { ALL_CATEGORIES } from '../../types/Category'
import NewEvent from '../../types/NewEvent'

const schema = yup.object().shape({
  title: yup.string().required().min(3).max(30),
  date: yup
    .string()
    .required()
    .matches(
      /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/,
      'date must be in format: yyyy-mm-dd'
    ),
  description: yup.string().required().min(10).max(160),
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
      <div className="form-group">
        <label htmlFor="title-input">Title</label>
        <input
          name="title"
          ref={register}
          id="title-input"
          aria-label="title-input"
          defaultValue={getDefaultValue('title')}
        />
        <div className="text-danger">
          {errors.title && errors.title.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="date-input">Date</label>
        <input
          name="date"
          ref={register}
          id="date-input"
          aria-label="date-input"
          defaultValue={getDefaultValue('date')}
        />
        <div className="text-danger">{errors.date && errors.date.message}</div>
      </div>
      <div className="form-group">
        <label htmlFor="category-select">Category</label>
        <select
          name="category"
          ref={register}
          id="category-select"
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
        <div className="text-danger">
          {errors.category && errors.category.message}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description-input">Description</label>
        <textarea
          name="description"
          ref={register}
          id="description-input"
          aria-label="description-input"
          defaultValue={getDefaultValue('description')}
        />
        <div className="text-danger">
          {errors.description && errors.description.message}
        </div>
      </div>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default EventForm
