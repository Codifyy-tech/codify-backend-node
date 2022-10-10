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

router.get(
  '/company/:id',
  AuthService.checkToken,
  CompanyController.infoCompany,
)

module.exports = router
