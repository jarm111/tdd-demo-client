import events from '../../src/mocks/eventsMockData'

it('fills new event form and adds created event to events list', () => {
  const [{title, date, category, description}] = events

  cy.visit('/')
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
  cy.findByText(title)
})