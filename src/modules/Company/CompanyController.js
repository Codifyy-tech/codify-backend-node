const ValidationContract = require('../../services/validatorService')
const CompanyRepository = require('./CompanyRepository')

exports.registerCompany = async (req, res) => {
  const { name, phone, cnpj, email, photo } = req.body

  const contract = new ValidationContract()
  contract.isRequired(name, 'O campo nome não pode ser vazio')
  contract.isEmail(email, 'E-mail inválido')
  contract.isRequired(photo, 'O campo foto não pode ser vazio')
  contract.isRequired(cnpj, 'O campo cnpj não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await CompanyRepository.create({
      name,
      cnpj,
      email,
      phone,
      photo,
    })

    res.status(201).json({
      message: 'Empresa cadastrada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.listCompany = async (req, res) => {
  try {
    const companyInfo = await CompanyRepository.find()

    res.status(200).send({
      data: companyInfo,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
