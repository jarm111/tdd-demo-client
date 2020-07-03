import events from '../../src/mocks/eventsMockData'
import {user} from '../../src/mocks/userMockData'

it('edits existing event', () => {
  const [event] = events
  const newDescription = 'My edited description'
  const editedEvent = {...event, description: newDescription}

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [event],
  })
  cy.route({
    method: 'PUT',
    url: `/api/events/${editedEvent.id}`,
    response: editedEvent,
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Edit')
    .click()
  cy.findByLabelText('description-input')
    .type(newDescription)
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('Edited event', {exact: false})
  cy.findByText(editedEvent.title)
    .click()
  cy.findByText(newDescription)
})

it('displays error message on failed edit event', () => {
  const [event] = events
  const newDescription = 'API does not like this description'
  const editedEvent = {...event, description: newDescription}

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [event],
  })
  cy.route({
    method: 'PUT',
    status: 400,
    url: `/api/events/${editedEvent.id}`,
    response: {error: "Status: 400, Description validation failed"},
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Edit')
    .click()
  cy.findByLabelText('description-input')
    .type(newDescription)
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('validation failed', {exact: false})
  cy.url().should('include', '/eventedit')
})

it('redirects on unauthorized edit event', () => {
  const [event] = events

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [event],
  })

  cy.visit(`#/eventedit/${event.id}`)
  cy.url().should('not.include', '/eventedit')
  cy.findByText('Edit event').should('not.exist')
})

it('removes existing event', () => {
  const [event] = events

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [event],
  })
  cy.route({
    method: 'DELETE',
    status: 204,
    url: `/api/events/${event.id}`,
    response: '',
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Edit')
    .click()
  cy.findByText('Remove event')
    .click()
  cy.findByRole('progressbar')
  cy.findByText(event.title).should('not.exist')
})

it('displays error message on failed remove event', () => {
  const [event] = events

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [event],
  })
  cy.route({
    method: 'DELETE',
    status: 401,
    url: `/api/events/${event.id}`,
    response: {error: "Status: 401, Authentication failed"},
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Edit')
    .click()
  cy.findByText('Remove event')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('authentication failed', {exact: false})
  cy.url().should('include', '/eventedit')
})
