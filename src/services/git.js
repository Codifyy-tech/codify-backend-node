const axios = require('axios')

exports.apigit = axios.create({
  baseURL: 'https://api.github.com',
})
