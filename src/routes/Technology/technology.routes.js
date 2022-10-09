const TechnologyRepository = require('../../modules/Technology/TechnologyController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/technology/register',
  AuthService.checkAdmin,
  TechnologyRepository.registerTechnology,
)

router.get(
  '/list/technology',
  AuthService.checkToken,
  TechnologyRepository.listTechnology,
)

module.exports = router
