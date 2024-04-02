const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  // See https://docs.cypress.io/guides/guides/launching-browsers#WebKit-Experimental
  experimentalWebKitSupport: false,
  // See https://docs.cypress.io/guides/references/configuration#Timeouts
  defaultCommandTimeout: 10000,
  requestTimeout: 12000,
  e2e: {
    specPattern: [
      "cypress/e2e/1-donate/*.cy.{js,jsx}",
      "cypress/e2e/2-volunteer/*.cy.{js,jsx}",
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
