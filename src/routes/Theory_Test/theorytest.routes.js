const TheoryTestRController = require('../../modules/Theory_Test/TheoryTestController')
const UserTheoryTestController = require('../../modules/User_Theory_Test/UserTheoryTestController')
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

router.get(
  '/theoryTest/approved/:id',
  AuthService.checkToken,
  UserTheoryTestController.verifyUserPassed,
)

module.exports = router
