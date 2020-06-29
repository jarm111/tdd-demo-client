import React from 'react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import LoadingIndicator from './LoadingIndicator'

export default {
  title: 'LoadingIndicator',
  decorators: [withKnobs],
}

export const withProps = () => (
  <LoadingIndicator loading={boolean('Loading', true)} />
)
