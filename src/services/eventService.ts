import axios from 'axios'

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
}

export default eventService
