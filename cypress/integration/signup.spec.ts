it('successfully creates new user account and logs out', () => {
  const email = 'test.user@email.com'
  const password = 'password1234'

  cy.server()
  cy.route({
    method: 'POST',
    url: '/api/signup',
    response: {
      token: 'token123',
      email,
      id: 'user123'
    }
  })

  cy.visit('/')
  cy.findByText('Sign up').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByText('Successfully created', {exact: false})
  cy.findByText('Log out')
    .click()
  cy.findByText('Logged out', {exact: false})
  cy.findByText('Sign up')
})

it('it displays error message on failed sign up', () => {
  const email = 'test.user@email.com'
  const password = 'password1234'

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
  cy.findByText('Sign up').click()
  cy.findByLabelText('email-input')
    .type(email)
  cy.findByLabelText('password-input')
    .type(password)
  cy.findByText('Submit')
    .click()
  cy.findByText('Error, expected', {exact: false})
})