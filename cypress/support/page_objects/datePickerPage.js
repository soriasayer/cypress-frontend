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
        cy.get('nb-calendar-day-picker .day-cell').not('.bounding-month').contains(futureDay).click()
      }
    })
    return dateFormat
  }

export class DatePickerPage{

  selectComonDatePickerDateFromToday(dayFromToday) {
    cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
      cy.wrap(input).click()
      let dateFormat = selectNextMonth(dayFromToday)
      cy.wrap(input).invoke('prop', 'value').should('contain', dateFormat)
    })
  }

  selectedDatepeckerWithRangeFromToday(firstDay, secondDay) {
     cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
      cy.wrap(input).click()
      let dateFormatFirst = selectNextMonth(firstDay)
      let dateFormatSecond = selectNextMonth(secondDay)
      let finalDateFormat = dateFormatFirst+' - '+dateFormatSecond
      cy.wrap(input).invoke('prop', 'value').should('contain', finalDateFormat)
      cy.wrap(input).should('have.value', finalDateFormat)
    })
  }
}

export const onDatePickerPage = new DatePickerPage()
