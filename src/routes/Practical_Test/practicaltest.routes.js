const PracticalTestController = require('../../modules/Practical_Test/PracticalTestController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/practicalTest/register',
  AuthService.checkAdmin,
  PracticalTestController.registerPracticalTest,
)

router.get(
  '/list/practicalTest',
  AuthService.checkToken,
  PracticalTestController.listPracticalTests,
)

router.get(
  '/practicalTest/:id',
  AuthService.checkToken,
  PracticalTestController.infoPracticalTests,
)

module.exports = router
