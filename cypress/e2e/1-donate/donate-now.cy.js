/// <reference types="cypress" />

describe('donate via the website top bar CTA', () => {
  const donateViaPayPalCTA = () => {
    return cy.get('#header').contains('Donate Now')
  }

  beforeEach(() => {
    cy.visit('https://pedalwithpete.org')
    cy.intercept('GET', 'https://www.paypal.com/donate?hosted_button_id=*').as('visitDonationPage')
  })

  it('displays the CTA', () => {
    // Click the donation button
    donateViaPayPalCTA().should('exist')
  })

  it('loads the payment page', () => {
    // Click the donation button
    donateViaPayPalCTA().click()
    // Wait for the page to load
    cy.wait('@visitDonationPage').its('response.statusCode').should('eq', 200)
    // Assert donation page for Pedal with Pete
    cy.contains('Pedal-with-Pete Foundation')
    // Check paypal payment button
    cy.contains('Donate with PayPal')
    // Check credit card payment button
    cy.contains('Donate with Debit or Credit Card')
  })
})
