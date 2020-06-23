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
    response: {...event, id: '4'},
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
  cy.findByText(title)
    .click()
  cy.findByText(description)
})