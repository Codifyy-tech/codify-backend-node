const PracticalTestRepository = require('./PracticalTestRepository')
const ValidationContract = require('../../services/validatorService')
const TechnologyRepository = require('../Technology/TechnologyRepository')
const CompanyRepository = require('../Company/CompanyRepository')

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

  const list_test = []

  try {
    const filter = {}
    if (company_id) filter.company_id = { $in: company_id }
    if (technology_id) filter.technology_id = { $in: technology_id }

    const practicalTests = await PracticalTestRepository.find(filter)

    for (const test of practicalTests) {
      const technology = await TechnologyRepository.findById(test.technology_id)

      const company = await CompanyRepository.findById(test.company_id)

      list_test.push({
        _id: test._id,
        title: test.title,
        description: test.description,
        company,
        technology,
        repository_url: test.repository_url,
        level: test.level,
      })
    }

    res.status(200).send({
      data: list_test,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.infoPracticalTests = async (req, res) => {
  const { id } = req.params

  try {
    const practicalTestsInfo = await PracticalTestRepository.findById(id)
    const companyInfo = await CompanyRepository.findById(
      practicalTestsInfo.company_id,
    )
    const technologyInfo = await TechnologyRepository.findById(
      practicalTestsInfo.technology_id,
    )

    res.status(200).send({
      _id: practicalTestsInfo._id,
      title: practicalTestsInfo.title,
      description: practicalTestsInfo.description,
      company: companyInfo,
      technology_id: technologyInfo,
      repository_url: practicalTestsInfo.repository_url,
      level: practicalTestsInfo.level,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
