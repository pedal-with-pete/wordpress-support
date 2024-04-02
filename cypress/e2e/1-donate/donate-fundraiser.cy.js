/// <reference types="cypress" />

describe('donate via fundraiser page', () => {
  const hitPayPalCTA = () => {
    // Click the donation button
    return cy.contains('Give Now').should('exist').invoke('removeAttr', 'target').click()
  }

  beforeEach(() => {
    cy.visit('https://pedalwithpete.org')
    cy.intercept('GET', 'https://www.paypal.com/fundraiser/charity/1645656').as('visitFundraiserPage')
  })

  it('loads the fundraiser page', () => {
    hitPayPalCTA()
    // Wait for the page to load
    cy.wait('@visitFundraiserPage').its('response.statusCode').should('eq', 200)
    cy.contains('Donate to PayPal Giving Fund')
    // Assert donation page for Pedal with Pete
    cy.contains('Pedal-with-Pete Foundation')
    // Shows the correct EIN
    cy.contains('EIN: 34-1732505')
  })

  xit('can make fixed amount donations', () => {
    hitPayPalCTA()
    // Wait for the page to load
    cy.wait('@visitFundraiserPage').its('response.statusCode').should('eq', 200)
    cy.contains('Donate to PayPal Giving Fund')
    // Assert donation page for Pedal with Pete
    cy.contains('Pedal-with-Pete Foundation')

    // Can make fixed amount donations
    const fixedDonationAmounts = [10, 25, 50, 100]
    fixedDonationAmounts.forEach(function (amount) {
      cy.contains(`$${amount}`).should('exist').click({ force: true })
      cy.wait(1000)
    })

    // Can make custom amount donation
    cy.contains('Other').should('exist').click({ force: true })
    cy.wait(1000)

    // Type in the custom amount
    cy.get('input[name=help][type=text]').type('22.50')

    // Can complete transaction
    cy.contains('Donate Now').should('be.enabled')
  })
})
