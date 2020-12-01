
 /// <reference types="cypress" />

describe('The first suite', () => {
  it('first test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()
    // by Tan name
    cy.get('input')
    // by ID
    cy.get('#inputEmail1')
    // by class name
    cy.get('.input-full-width')
    // by attribute name
    cy.get('[placeholder]')
    // by attribute and value
    cy.get('[placeholder="Email"]')
    // by class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]')
    // Tagname and attribute and value
    cy.get('input[placeholder="Email"]')
    // by two different attributes
    cy.get('[placeholder="Email"][fullwidth][type="email"]')
    // by tag name, attribute with value, ID and class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width')
    // The most recommended way by Cypress
    cy.get('[data-cy="imputEmail1"]')
  })

  it.only('second test', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    cy.get('[data-cy="signInButton"]')
    cy.contains('Sign in')
    cy.contains('[status="warning"]','Sign in')

    cy.get('#inputEmail3')
      .parents('form')
      .find('button')
      .should('contain', 'Sign in')
      .parents('form')
      .find('nb-checkbox')
      .click()

      cy.contains('nb-card', 'Horizontal form').find('[type="email"]')
  })
})
