const TheoryTestRController = require('../../modules/Theory_Test/TheoryTestController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/theoryTest/register',
  AuthService.checkToken,
  TheoryTestRController.registerTheoryTest,
)

router.post(
  '/theoryTest/result',
  AuthService.checkToken,
  TheoryTestRController.resultTheoryTest,
)

router.get(
  '/list/theoryTest',
  AuthService.checkToken,
  TheoryTestRController.listTheoryTests,
)
module.exports = router
