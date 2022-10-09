const PracticalTestRepository = require('./Practical_Test')
const ValidationContract = require('../../services/validatorService')

exports.registerPracticalTest = async (req, res) => {
  const { title, description, company_id, technology_id, level } = req.body

  const contract = new ValidationContract()
  contract.isRequired(title, 'O campo título não pode ser vazio')
  contract.isRequired(description, 'O campo descrição não pode ser vazio')
  contract.isRequired(technology_id, 'O campo tecnologia não pode ser vazio')
  contract.isRequired(company_id, 'O campo empresa não pode ser vazio')
  contract.isRequired(level, 'O campo nível não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await PracticalTestRepository.create({
      title,
      description,
      company_id,
      technology_id,
      level,
    })

    res.status(201).json({
      message: 'Teste prático cadastrado com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
