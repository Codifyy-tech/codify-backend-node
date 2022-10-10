const TheoryTestRController = require('../../modules/Theory_Test/TheoryTestController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/theoryTest/register',
  AuthService.checkToken,
  TheoryTestRController.registerTheoryTest,
)

module.exports = router
