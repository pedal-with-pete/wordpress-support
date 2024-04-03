const dayjs = require('dayjs')

const getWebsiteURL = (uri = null) => {
  const baseURL = process.env.WEBSITE_URL || 'https://www.pedalwithpete.org'
  return [baseURL, uri].filter(part => part).join('/')
}

const getVideosFolder = () => {
  if (!!process.env.CI) return 'cypress/videos'
  return `cypress/videos/${dayjs().format('YYYY.MM')}`
}

const getExcludeSpecPattern = () => {
  const excludeSpecPattern = [
    (!!process.env.CI || !!process.env.CYPRESS_EXCLUDE_ADHOC_SPECS) && 'cypress/e2e/**/*{-,.}adhoc.cy.js'
  ]

  return excludeSpecPattern.filter(val => val)
}

module.exports = {
  getWebsiteURL,
  getVideosFolder,
  getExcludeSpecPattern
}
