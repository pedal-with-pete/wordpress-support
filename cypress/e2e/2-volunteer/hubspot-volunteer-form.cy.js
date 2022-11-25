/// <reference types="cypress" />

function getIFrameBody($el) {
  return $el.contents().find('body')
}

function getIFrameInput(nameAttr, $el) {
  return cy.wrap(getIFrameBody($el)).find(`input[name=${nameAttr}]`).eq(0)
}

function inHubSpotForm(testHandler) {
  return cy.get('iframe.hs-form-iframe').then(testHandler)
}

describe('hubspot volunteer form', () => {
  beforeEach(() => {
    cy.visit('https://pedalwithpete.org')
    cy.intercept('GET', 'https://pedalwithpete.org/volunteer').as('visitVolunteerPage')
    cy.contains('Sign Up').click()
    cy.wait('@visitVolunteerPage')
  })

  it('requires first name', () => {
    inHubSpotForm($el => {
      const $body = getIFrameBody($el)
      const firstNameInput = getIFrameInput('firstname', $el)
      firstNameInput.should('exist')
      firstNameInput.focus({ force: true }).blur({ force: true })
      cy.wait(1000)
      cy.wrap($body).contains('Please complete this required field')
    })
  })

  it('requires last name', () => {
    inHubSpotForm($el => {
      const $body = getIFrameBody($el)
      const firstNameInput = getIFrameInput('firstname', $el)
      firstNameInput.should('exist').type('Maya', { force: true })
      const lastNameInput = getIFrameInput('lastname', $el)
      lastNameInput.should('exist').focus({ force: true }).blur({ force: true })
      cy.wait(1000)
      cy.wrap($body).contains('Please complete this required field')
    })
  })

  it('requires email', () => {
    inHubSpotForm($el => {
      const $body = getIFrameBody($el)
      const firstNameInput = getIFrameInput('firstname', $el)
      firstNameInput.should('exist').type('Maya', { force: true })
      const lastNameInput = getIFrameInput('lastname', $el)
      lastNameInput.should('exist').type('Summers', { force: true })
      const emailInput = getIFrameInput('email', $el)
      emailInput.should('exist').focus({ force: true }).blur({ force: true })
      cy.wait(1000)
      cy.wrap($body).contains('Please complete this required field')
    })
  })

  it('collects phone number', () => {
    inHubSpotForm($el => {
      getIFrameInput('phone', $el).should('exist')
      const $body = getIFrameBody($el)
      cy.wrap($body).contains('Please complete this required field').should('not.exist')
    })
  })
})