import events from '../../src/mocks/eventsMockData'
import {user} from '../../src/mocks/userMockData'

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
