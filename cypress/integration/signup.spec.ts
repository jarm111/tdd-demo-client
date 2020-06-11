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
  cy.findByText('Log out')
    .click()
  cy.findByText('Sign up')
})