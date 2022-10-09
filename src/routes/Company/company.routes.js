const CompanyController = require('../../modules/Company/CompanyController')
const AuthService = require('../../services/authService')
const express = require('express')
const router = express.Router()

router.post(
  '/company/register',
  AuthService.checkAdmin,
  CompanyController.registerCompany,
)

router.get(
  '/list/company',
  AuthService.checkToken,
  CompanyController.listCompany,
)

module.exports = router
