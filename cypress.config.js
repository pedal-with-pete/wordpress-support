const { defineConfig } = require("cypress");
const { getVideosFolder, getExcludeSpecPattern } = require("./cypress/support/utils");

module.exports = defineConfig({
  chromeWebSecurity: false,
  // See https://docs.cypress.io/guides/guides/launching-browsers#WebKit-Experimental
  experimentalWebKitSupport: false,
  // See https://docs.cypress.io/guides/references/configuration#Timeouts
  defaultCommandTimeout: 10000,
  requestTimeout: 12000,
  // See https://docs.cypress.io/guides/references/configuration#Viewport
  viewportHeight: 900,
  viewportWidth: 1440,
  // See https://docs.cypress.io/guides/references/configuration#Videos
  video: process.env.CI === "true" ? false : true,
  videosFolder: getVideosFolder(),
  videoCompression: 42,
  e2e: {
    specPattern: [
      "cypress/e2e/1-donate/*.cy.{js,jsx}",
      "cypress/e2e/2-volunteer/*.cy.{js,jsx}",
    ],
    excludeSpecPattern: getExcludeSpecPattern(),
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
