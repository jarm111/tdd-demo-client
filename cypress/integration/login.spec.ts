import {user, credentials} from '../../src/mocks/userMockData'

it('successfully logs in and logs out', () => {
  const {email, password} = credentials

  cy.server()
  cy.route({
    method: 'POST',
    url: '/api/login',
    response: user,
    delay: 100
  })

  cy.visit('/')
  cy.findByText('Login').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('Logged in', {exact: false})
  cy.findByText('Log out')
    .click()
  cy.findByText('Logged out', {exact: false})
  cy.findByText('Login')
})

it('it displays error message on failed login', () => {
  const {email, password} = credentials

  cy.server()
  cy.route({
    method: 'POST',
    url: '/api/login',
    status: 400,
    response: {
      error: "Status: 400, Unauthorized, wrong password"
    }
  })

  cy.visit('/')
  cy.findByText('Login').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByText('Unauthorized', {exact: false})
})