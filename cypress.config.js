const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  // See https://docs.cypress.io/guides/references/configuration#Timeouts
  defaultCommandTimeout: 10000,
  requestTimeout: 12000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
