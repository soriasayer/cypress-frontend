import { onDatePickerPage } from "../support/page_objects/datePickerPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { navigation } from "../support/page_objects/navigationPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe('Test with page objects', () => {

  beforeEach('Open application', () => {
    cy.visit('/')
  })

  it('Verify navigation accros the pages', () => {
    navigation.formLayoutPage()
    navigation.datePickerPage()
    navigation.smartTablePage()
    navigation.toasterPage()
    navigation.tooltipPage()
  })

  it.only('Should submit inline and basic form and select tomorrow date in the calender', () => {
    navigation.formLayoutPage()
    onFormLayoutsPage.submitInlineFormWithNameAndEmail('Ashkaan', 'ashkaan@email.com')
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword('ashkaan@email.com', 'test123')

    navigation.datePickerPage()
    onDatePickerPage.selectComonDatePickerDateFromToday(5)
    onDatePickerPage.selectedDatepeckerWithRangeFromToday(7, 14)

    navigation.smartTablePage()
    onSmartTablePage.addNewRecordWithFirstAndLastName('Ashkaan', 'Sayer', 'ashkaansayer', 'ashkaan@email.com', '2')
     onSmartTablePage.updateAgeByFirstName('Ashkaan', '4')
    onSmartTablePage.deleteRowByIndex(2)
  })
})
