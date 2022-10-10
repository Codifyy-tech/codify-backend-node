const PracticalTestRepository = require('./PracticalTestrepository')
const ValidationContract = require('../../services/validatorService')

exports.registerPracticalTest = async (req, res) => {
  const {
    title,
    description,
    company_id,
    technology_id,
    level,
    repository_url,
  } = req.body

  const contract = new ValidationContract()
  contract.isRequired(title, 'O campo título não pode ser vazio')
  contract.isRequired(description, 'O campo descrição não pode ser vazio')
  contract.isRequired(technology_id, 'O campo tecnologia não pode ser vazio')
  contract.isRequired(company_id, 'O campo empresa não pode ser vazio')
  contract.isRequired(level, 'O campo nível não pode ser vazio')
  contract.isRequired(repository_url, 'O campo repositório não pode ser vazio')

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
      repository_url,
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

exports.listPracticalTests = async (req, res) => {
  const { company_id, technology_id } = req.query

  try {
    const filter = {}
    if (company_id) filter.company_id = company_id
    if (technology_id) filter.technology_id = technology_id

    const PracticalTests = await PracticalTestRepository.find(filter)

    res.status(200).send({
      data: PracticalTests,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
