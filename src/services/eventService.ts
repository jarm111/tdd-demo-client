import axios from 'axios'
import NewEvent from '../types/NewEvent'

type ResponseError = {
  response: {
    status: number
    statusText: string
    data: {
      error: string
    }
  }
}

const eventsUrl = '/api/events'

const throwError = (e: ResponseError) => {
  const {
    status,
    statusText,
    data: { error },
  } = e.response
  throw new Error(`Status: ${status} ${statusText}, ${error}`)
}

const eventService = {
  fetchEvents: async () => {
    try {
      const { data } = await axios.get(eventsUrl)
      return data
    } catch (e) {
      throw e
    }
  },
  createEvent: async (event: NewEvent, token: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const res = await axios.post(eventsUrl, event, config)
      return res.data
    } catch (e) {
      throwError(e)
    }
  },
}

export default eventService
