const UserController = require('../modules/User/UserController');
const AuthService = require('../services/authService');
const express = require('express');
const router = express.Router();

router.get('/checktoken', AuthService.checkToken, UserController.checkToken);
router.get('/info', AuthService.checkToken, UserController.infoUser);

router.post('/auth', UserController.authenticateUser);
router.post('/user/register', UserController.signUp);

router.put('/edit', AuthService.checkToken, UserController.editInfo);

module.exports = router;