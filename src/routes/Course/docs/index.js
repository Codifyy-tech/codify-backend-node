const create = require('./create')
const list = require('./list')
const info = require('./info')
const registerUser = require('./registerUser')

module.exports = { ...create, ...list, ...info, ...registerUser }
