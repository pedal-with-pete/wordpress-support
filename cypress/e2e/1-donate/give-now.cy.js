/// <reference types="cypress" />

function getWebsiteURL() {
  return process.env.WEBSITE_URL || 'https://www.pedalwithpete.org'
}

describe('donate via the website top bar CTA', () => {
  const donateViaPayPalCTA = () => {
    return cy.get('a.gutentor-button').filter(':contains("Give Now")')
  }

  const ccpaDisclosureAcceptCTA = () => {
    return cy.get('#ccpaCookieBanner').find('button').contains('Yes, I accept')
  }

  beforeEach(() => {
    console.debug(`Website URL: ${getWebsiteURL()}`)
    cy.visit(getWebsiteURL())
    cy.intercept('GET', 'https://www.paypal.com/fundraiser/charity/*').as('visitDonationPage')
    cy.intercept('GET', 'https://www.paypal.com/donate?token=*').as('paymentModal')
  })

  it('displays the CTA', () => {
    // Click the donation button
    donateViaPayPalCTA().should('exist')
  })

  it('loads the payment page with a "Donate" button', () => {
    // Click the donation button
    donateViaPayPalCTA().invoke("attr", "target", "_self").click()
    // Wait for the page to load
    cy.wait('@visitDonationPage').its('response.statusCode').should('eq', 200)
    // Accept cookie disclosure
    // acceptCCPADisclosure()
    // Assert donation page for Pedal with Pete
    cy.get('#page').contains('Pedal-with-Pete Foundation')
    // Check paypal payment button
    cy.get('button').contains("Donate").should('exist')
  })
})
