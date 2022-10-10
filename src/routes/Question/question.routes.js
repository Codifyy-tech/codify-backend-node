const QuestionController = require('../../modules/Question/QuestionController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/question/register',
  AuthService.checkAdmin,
  QuestionController.registerQuestion,
)

module.exports = router
