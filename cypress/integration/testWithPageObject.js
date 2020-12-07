import { navigation } from "../support/page_objects/navigationPage";


describe('Test with page objects', () => {
  beforeEach('Open application', () => {
    cy.visit('/')
  })

  it('Verify navigation accros the pages', () => {
    navigation.formLayoutPage()
    navigation.datePickerPage()
  })
})
