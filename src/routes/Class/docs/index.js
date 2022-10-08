const list = require('./list')
const create = require('./create')
const update = require('./update')

module.exports = {
  ...create,
  '/class/{id}': {
    ...list['/class/{id}'],
    ...update['/class/{id}'],
  },
}
