const getWebsiteURL = (uri = null) => {
  const baseURL = process.env.WEBSITE_URL || 'https://www.pedalwithpete.org'
  return [baseURL, uri].filter(part => part).join('/')
}

module.exports = {
  getWebsiteURL
}
