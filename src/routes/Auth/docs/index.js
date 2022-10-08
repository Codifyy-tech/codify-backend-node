const checkToken = require('./check')
const auth = require('./auth')

module.exports = { ...auth, ...checkToken }
