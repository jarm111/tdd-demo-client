import axios from 'axios'
import NewEvent from '../types/NewEvent'
import Event from '../types/Event'
import formatResponseError from '../utils/formatResponseError'

const eventsUrl = '/api/events'

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
      throw new Error(formatResponseError(e))
    }
  },
  modifyEvent: async (event: Event, token: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const res = await axios.put(`${eventsUrl}/${event.id}`, event, config)
      return res.data
    } catch (e) {
      throw new Error(formatResponseError(e))
    }
  },
  deleteEvent: async (eventId: string, token: string) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      }

      const res = await axios.delete(`${eventsUrl}/${eventId}`, config)
      return res.data
    } catch (e) {
      throw new Error(formatResponseError(e))
    }
  },
}

export default eventService
