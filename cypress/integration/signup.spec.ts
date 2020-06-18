import {user, credentials} from '../../src/mocks/userMockData'

it('successfully creates new user account and logs out', () => {
  const {email, password} = credentials

  cy.server()
  cy.route({
    method: 'POST',
    url: '/api/signup',
    response: user,
    delay: 100
  })

  cy.visit('/')
  cy.findByText('Login').click()
  cy.findByText('Sign up').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByLabelText('retype-password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByRole('progressbar')
  cy.findByText('Successfully created', {exact: false})
  cy.findByText('Log out')
    .click()
  cy.findByText('Logged out', {exact: false})
  cy.findByText('Login')
})

it('it displays error message on failed sign up', () => {
  const {email, password} = credentials

  cy.server()
  cy.route({
    method: 'POST',
    url: '/api/signup',
    status: 400,
    response: {
      error: "User validation failed: email: Error, expected `email` to be unique. Value: `test.user@email.com`"
    }
  })

  cy.visit('/')
  cy.findByText('Login').click()
  cy.findByText('Sign up').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByLabelText('retype-password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByText('Error, expected', {exact: false})
})