import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import { Provider } from 'react-redux'
import App from './App'
import events from './mocks/eventsMockData'
import store from './store'

describe('<App />', () => {
  it('fills event form and adds new event to list', async () => {
    const [{ title, date, description, category }] = events
    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

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

    getByText(title)
  })
})
