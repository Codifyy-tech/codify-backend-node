const UserController = require('../../modules/User/UserController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.get('/checktoken', AuthService.checkToken, UserController.checkToken)
router.post('/auth', UserController.authenticateUser)

module.exports = router
