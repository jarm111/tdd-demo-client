import events from '../../src/mocks/eventsMockData'
import {user} from '../../src/mocks/userMockData'

it('displays events and opens details on click', () => {
  const [, , {title, description}] = events

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: events,
    delay: 100
  })
  cy.visit('/')
  cy.findByRole('progressbar')
  cy.findByText(title)
    .click()
  cy.findByText(description)
})

it('creates new event', () => {
  const [event] = events
  const {title, date, category, description} = event

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [],
  })
  cy.route({
    method: 'POST',
    url: '/api/events',
    response: event,
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Create').click()
  cy.findByLabelText('title-input')
    .type(title)
  cy.findByLabelText('date-input')
    .type(date)
  cy.findByLabelText('category-select')
    .select(category)
  cy.findByLabelText('description-input')
    .type(description) 
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('Created new event', {exact: false})
  cy.findByText(title)
    .click()
  cy.findByText(description)
})

it('displays error message on failed create event', () => {
  const [event] = events
  const {title, date, category, description} = event

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [],
  })
  cy.route({
    method: 'POST',
    url: '/api/events',
    status: 400,
    response: {error: "Status: 400, Title validation failed"},
    delay: 100
  })

  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })

  cy.visit('/')
  cy.findByText('Create').click()
  cy.findByLabelText('title-input')
    .type(title)
  cy.findByLabelText('date-input')
    .type(date)
  cy.findByLabelText('category-select')
    .select(category)
  cy.findByLabelText('description-input')
    .type(description)
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('validation failed', {exact: false})
  cy.url().should('include', '/create')
})

it('redirects if navigating to create and not logged in', () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: [],
  })

  cy.visit('#/create')
  cy.url().should('not.include', '/create')
  cy.findByText('Create').should('not.exist')
})

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
