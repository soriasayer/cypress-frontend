
const selectGroupMenuItem = (form) => {
  cy.contains('a', form).then(menu => {
      cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
        if(attr.includes('left')) {
          cy.wrap(menu).click()
        }
      })
    })
}

export class NavigationPage{
  formLayoutPage() {
    selectGroupMenuItem('Forms')
    cy.contains('Form Layouts').click()
  }

  datePickerPage() {
    selectGroupMenuItem('Forms')
    cy.contains('Datepicker').click()
  }
}

export const navigation = new NavigationPage()
