// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/* global Cypress, cy */

import '@testing-library/cypress/add-commands';
import {user} from '../../src/mocks/userMockData'

Cypress.Commands.add('login', () => {
  cy.window().then(window => {
    window.localStorage.setItem('Login', JSON.stringify(user))
  })
})
