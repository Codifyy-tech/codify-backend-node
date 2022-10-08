const CourseController = require('../../modules/Course/CourseController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/course/register',
  AuthService.checkAdmin,
  CourseController.registerCourse,
)
router.post(
  '/course/user/register',
  AuthService.checkToken,
  CourseController.registerUserCourse,
)

router.get('/list/course', AuthService.checkToken, CourseController.listCourse)
router.get('/course/:id', AuthService.checkToken, CourseController.infoCourse)
router.get(
  '/course/class/:id',
  AuthService.checkToken,
  CourseController.infoClass,
)

module.exports = router
