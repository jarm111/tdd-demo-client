import events from '../../src/mocks/eventsMockData'

it('displays events and opens details on click', () => {
  const [, , {title, description}] = events

  cy.server()
  cy.route({
    method: 'GET',
    url: '/api/events',
    response: events,
    delay: 1000
  })
  cy.visit('/')
  cy.findByRole('progressbar')
  cy.findByText(title)
    .click()
  cy.findByText(description)
})
