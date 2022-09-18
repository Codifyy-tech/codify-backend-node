const ClassController = require('../modules/Class/ClassController');
const AuthService = require('../services/authService');
const express = require('express');
const router = express.Router();

router.post('/class/register', AuthService.checkAdmin, ClassController.registerClass);

module.exports = router;