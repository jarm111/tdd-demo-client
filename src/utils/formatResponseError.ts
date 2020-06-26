type ResponseError = {
  response: {
    status: number
    statusText: string
    data: {
      error: string
    }
  }
}

const formatResponseError = (e: ResponseError) => {
  const {
    status,
    statusText,
    data: { error },
  } = e.response

  return `Status: ${status} ${statusText}, ${error}`
}

export default formatResponseError
