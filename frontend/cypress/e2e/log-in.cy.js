/// <reference types="cypress" />

describe('log in page', () => {


  context('log in form', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/log-in')
    })

    it('validate email', () => {
      cy.get('[data-test="email"]').type('abc')
      cy.get('[data-test="email_error"]').contains('Invalid email address')

      cy.get('[data-test="email"]').type('@gmail.com')
      cy.get('[data-test="email_error"]').should('not.exist')
    })
  })

})