import React from 'react'
import FadeLoader from 'react-spinners/FadeLoader'

type Props = {
  loading: boolean
}

const LoadingIndicator = ({ loading }: Props) => {
  if (!loading) {
    return null
  }

  return (
    <div role="progressbar">
      <FadeLoader />
    </div>
  )
}

export default LoadingIndicator
