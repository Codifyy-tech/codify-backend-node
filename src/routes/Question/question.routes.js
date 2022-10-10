const QuestionController = require('../../modules/Question/QuestionController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/question/register',
  AuthService.checkAdmin,
  QuestionController.registerQuestion,
)

router.get(
  '/question/:id',
  AuthService.checkToken,
  QuestionController.infoQuestion,
)

module.exports = router
