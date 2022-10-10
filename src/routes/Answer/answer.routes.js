const AnswerController = require('../../modules/Answer/AnswerController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/answer/register',
  AuthService.checkAdmin,
  AnswerController.registerAnswer,
)

module.exports = router
