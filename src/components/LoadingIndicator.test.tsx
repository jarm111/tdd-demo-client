import React from 'react'
import { render } from '@testing-library/react'
import LoadingIndicator from './LoadingIndicator'

test('shows when display is true', () => {
  const loading = true

  const { getByRole } = render(<LoadingIndicator loading={loading} />)

  getByRole('progressbar')
})

test('does not show when display is false', () => {
  const loading = false

  const { queryByRole } = render(<LoadingIndicator loading={loading} />)

  expect(queryByRole('progressbar')).toBeFalsy()
})
