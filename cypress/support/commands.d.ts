/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to set user logged in in localstorage.
     * @example cy.login()
    */
    login(): Chainable<Element>
  }
}