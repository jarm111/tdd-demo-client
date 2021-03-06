import React from 'react'
import { render, fireEvent, act } from '@testing-library/react'
import EventList from './EventList'
import events from '../../mocks/eventsMockData'
import { user } from '../../mocks/userMockData'
import User from '../../types/User'

const setup = (user: User | null = null) => {
  const handleClick = jest.fn()
  const handleEdit = jest.fn()
  const result = render(
    <EventList
      onClick={handleClick}
      events={events}
      onEdit={handleEdit}
      user={user}
    />
  )
  return {
    handleClick,
    handleEdit,
    result,
  }
}

test('displays list of events', () => {
  const {
    handleClick,
    result: { getAllByText },
  } = setup()

  const items = getAllByText('My event', { exact: false })

  expect(items).toHaveLength(3)

  fireEvent.click(items[0])

  expect(handleClick).toHaveBeenCalledTimes(1)
  expect(handleClick).toHaveBeenCalledWith(events[0].id)
})

test('sorts events asc/desc by date', async () => {
  const {
    result: { getByLabelText, getAllByText },
  } = setup()

  await act(async () => {
    fireEvent.change(getByLabelText('order-select'), {
      target: { value: 'asc' },
    })
  })

  const itemsAsc = getAllByText('My event', { exact: false })

  expect(itemsAsc[0].innerHTML).toEqual(events[0].title)

  await act(async () => {
    fireEvent.change(getByLabelText('order-select'), {
      target: { value: 'desc' },
    })
  })

  const itemsDesc = getAllByText('My event', { exact: false })

  expect(itemsDesc[0].innerHTML).toEqual(events[events.length - 1].title)
})

test('filters events by title', async () => {
  const {
    result: { getByLabelText, getAllByText },
  } = setup()

  const [, , eventThree] = events

  await act(async () => {
    fireEvent.input(getByLabelText('filter-title-input'), {
      target: { value: eventThree.title.toLowerCase() },
    })
  })

  const titles = getAllByText('My event', { exact: false }).map(
    (element) => element.innerHTML
  )

  expect(titles.length).toEqual(1)
  expect(titles).toContain(eventThree.title)
})

test('filters events by category', async () => {
  const {
    result: { getByLabelText, getAllByText },
  } = setup()

  const [, , eventThree] = events

  await act(async () => {
    fireEvent.change(getByLabelText('filter-category-select'), {
      target: { value: eventThree.category },
    })
  })

  const titles = getAllByText('My event', { exact: false }).map(
    (element) => element.innerHTML
  )

  expect(titles.length).toEqual(1)
  expect(titles).toContain(eventThree.title)
})

test('filters events by owner', async () => {
  const {
    result: { getByLabelText, getAllByText },
  } = setup(user)

  const [ownEvent] = events

  await act(async () => {
    fireEvent.click(getByLabelText('filter-own-checkbox'))
  })

  const titles = getAllByText('My event', { exact: false }).map(
    (element) => element.innerHTML
  )

  expect(titles.length).toEqual(1)
  expect(titles).toContain(ownEvent.title)
})
