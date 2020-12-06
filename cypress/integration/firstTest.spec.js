
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

  it.only('assert propertis', () => {
    cy.visit('/')
    cy.contains('Forms').click()
    cy.contains('Datepicker').click()

    function selectNextMonth (day){
      let date = new Date()
      date.setDate(date.getDate() + day)
      let futureDay = date.getDate()
      let futureMonth = date.toLocaleString('defaul', {month: 'short'})
      let dateFormat = futureMonth+' '+futureDay+', '+date.getFullYear()

      cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttriute => {
        if(!dateAttriute.includes(futureMonth)){
          cy.get('[data-name="chevron-right"]').click()
          selectNextMonth(day)
        } else {
          cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click()
        }
      })
      return dateFormat
    }

    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateFormat = selectNextMonth(60)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateFormat)
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

  it('check boxes', () => {
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

  it('lists and dropdowns', () => {
    cy.visit('/')
    // 1
    // cy.get('nav nb-select').click()
    // cy.get(".options-list").contains('Dark').click()
    // cy.get('nav nb-select').should('contain', 'Dark')
    // cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)')

    // 2

    cy.get('nav nb-select').then(dropdown => {
      cy.wrap(dropdown).click()
      cy.get(".options-list nb-option").each((listItem, index) => {
        const itemText = listItem.text().trim()

        const itemColors = {
          "Light": "rgb(255, 255, 255)",
          "Dark": "rgb(34, 43, 69)",
          "Cosmic": "rgb(50, 50, 89)",
          "Corporate": "rgb(255, 255, 255)"
        }

        cy.wrap(listItem).click()
        cy.wrap(dropdown).should('contain', itemText)
        cy.get('nb-layout-header nav').should('have.css', 'background-color', itemColors[itemText])
        if(index < 3) {
          cy.wrap(dropdown).click()
        }
      })
    })
  })

  // finding an element in a table

  it('Web Tables', () => {
    cy.visit('/')
    cy.contains('Tables & Data').click()
    cy.contains('Smart Table').click()

    // 1
    cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
      cy.wrap(tableRow).find('.nb-edit').click()
      cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('26')
      cy.wrap(tableRow).find(".nb-checkmark").click()
      cy.wrap(tableRow).find('td').eq(6).should('contain', '26')
    })

    // 2

    cy.get('thead').find('.nb-plus').click()
    cy.get('thead').find('tr').eq(2).then(tableRow => {
      cy.wrap(tableRow).find('[placeholder="First Name"]').type('Askaan')
      cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Sayer')
      cy.wrap(tableRow).find('[placeholder="Username"]').type('ashkaansayer')
      cy.wrap(tableRow).find('[placeholder="E-mail"]').type('ashkaan@email.com')
      cy.wrap(tableRow).find('[placeholder="Age"]').type('2')
      cy.wrap(tableRow).find('.nb-checkmark').click()
    })
    cy.get('tbody tr').first().find('td').then(tableColunms => {
      cy.wrap(tableColunms).eq(2).should('contain', 'Askaan')
      cy.wrap(tableColunms).eq(3).should('contain', 'Sayer')
    })

    // 3
    const ageArray = [20, 30, 40, 200]
    cy.wrap(ageArray).each(age => {
      cy.get('thead [placeholder="Age"]').clear().type(age)
      cy.wait(500)
      cy.get('tbody tr').each(tableRows => {
        if(age === 200) {
          cy.wrap(tableRows).should('contain', 'No data found')
        } else {
          cy.wrap(tableRows).find('td').eq(6).should('contain', age)
        }
      })
    })
  })
})
