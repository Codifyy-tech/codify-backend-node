const CourseController = require('../modules/Course/CourseController');
const AuthService = require('../services/authService');
const express = require('express');
const router = express.Router();

router.post('/course/register', AuthService.checkAdmin, CourseController.registerCourse);

module.exports = router;