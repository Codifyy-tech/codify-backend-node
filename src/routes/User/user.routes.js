const UserController = require('../../modules/User/UserController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.get('/info', AuthService.checkToken, UserController.infoUser)

router.post('/user/register', UserController.signUp)

router.put('/edit', AuthService.checkToken, UserController.editInfo)

router.get('/dashboard', AuthService.checkAdmin, UserController.dashboard)

module.exports = router
