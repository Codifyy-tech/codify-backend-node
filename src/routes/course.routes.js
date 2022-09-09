const CourseController = require('../modules/Course/CourseController');
const AuthService = require('../services/authService');
const express = require('express');
const router = express.Router();

router.post('/course/register', AuthService.checkAdmin, CourseController.registerCourse);

router.get('/course/:id', AuthService.checkToken, CourseController.infoCourse);
router.get('/list/course', AuthService.checkToken, CourseController.listCourse);

module.exports = router;