const create = require('./create')
const update = require('./update')
const info = require('./info')

module.exports = { ...create, ...update, ...info }
