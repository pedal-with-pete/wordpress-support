/// <reference types="cypress" />

import { getWebsiteURL } from '../../support/utils'

describe('donate via the website top bar CTA', () => {
  beforeEach(() => {
    cy.viewport('macbook-15')
    cy.visit(getWebsiteURL())
    cy.get('a.gutentor-button').filter(':contains("Give Now")').as('giveNowButton')
    cy.intercept('GET', 'https://www.paypal.com/fundraiser/charity/*').as('visitDonationPage')
    cy.intercept('GET', 'https://www.paypal.com/donate?token=*').as('paymentModal')
  })

  it('displays the "Give Now" CTA', () => {
    cy.get('@giveNowButton').should('exist')
  })

  it('loads the payment page with a "Donate" button', () => {
    // Click the donation button
    cy.get('@giveNowButton').invoke("attr", "target", "_self").click()
    // Wait for the page to load
    cy.wait('@visitDonationPage').its('response.statusCode').should('eq', 200)
    // Assert donation page for Pedal with Pete
    cy.get('#page').contains('Pedal-with-Pete Foundation')
    // Check paypal payment button
    cy.get('button').contains("Donate").should('exist')
  })
})
