
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

  it('second test', () => {
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

  it('then and wrap methods', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email')
    // cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password')

    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password')

    // selenium style
    // const firstForm = cy.contains('nb-card', 'Using the Grid')
    // const secondForm = cy.contains('nb-card', 'Basic form')

    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
    // firstForm.find('[for="inputEmail1"]').should('contain', 'Email')
    // secondForm.find('[for="exampleInputEmail1"]').should('contain', 'Email address')
    // secondForm.find('[for="exampleInputPassword1"]').should('contain', 'Password')

    // cypress style
    cy.contains('nb-card', 'Using the Grid').then(firstForm => {
      // JQuery method
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text()
      const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text()
      expect(emailLabelFirst).to.equal('Email')
      expect(passwordLabelFirst).to.equal('Password')

      cy.contains('nb-card', 'Basic form').then(secondForm => {
        const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text()
        expect(passwordLabelFirst).to.equal(passwordLabelSecond)
        // cypress method
        cy.wrap(secondForm).find('[for="exampleInputPassword1"]').should('contain', 'Password')
      })
    })
  })

  it('invoke commond', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

    // Ex-1
    cy.get('[for="exampleInputEmail1"]').should('contain', 'Email address')

    // Ex-2  JQeury method
    cy.get('[for="exampleInputEmail1"]').then(label => {
      expect(label.text()).to.equal('Email address')
    })

    // Ex-3  Cypress method
    cy.get('[for="exampleInputEmail1"]').invoke('text').then(text => {
      expect(text).to.equal('Email address')
    })

    cy.contains('nb-card', 'Basic form')
      .find('nb-checkbox')
      .click()
      .find(".custom-checkbox")
      .invoke('attr', 'class')
      // .should('contain', 'checked')
      .then(classVal => {
        expect(classVal).to.contain('checked')
      })
  })

  it('assert propertis', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      cy.get('nb-calendar-day-picker').contains('17').click()
      cy.wrap(input).invoke('prop', 'value').should('contain', 'Dec 17, 2020')
    })
  })

  it('radio button', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Form Layouts').click()

     cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioBtn => {
        cy.wrap(radioBtn)
          .first()
          .check({force: true})
          .should('be.checked')

        cy.wrap(radioBtn)
          .eq(1)
          .check({force: true})

        cy.wrap(radioBtn)
          .first()
          .should('not.be.checked')

        cy.wrap(radioBtn)
          .eq(2)
          .should('be.disabled')
    })
  })

  it.only('check boxes', () => {
    cy.visit('/')
    cy.contains('Modal & Overlays').click()
    cy.contains('Toastr').click()

    // it check the unchecked button
    cy.get('[type="checkbox"]').check({force: true})
    // it unchecked the checked and check the uncheck
    cy.get('[type="checkbox"]').eq(0).click({force: true})
    cy.get('[type="checkbox"]').eq(1).click({force: true})
    cy.get('[type="checkbox"]').eq(2).click({force: true})
  })

})
