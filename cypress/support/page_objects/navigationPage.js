
const selectGroupMenuItem = (menuNames) => {
  cy.contains('a', menuNames).then(menu => {
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

  toasterPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click()
  }

  smartTablePage(){
    selectGroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click()
  }

  tooltipPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click()
  }
}

export const navigation = new NavigationPage()
