const TheoryTestRepository = require('./TheoryTestRepository')
const ValidationContract = require('../../services/validatorService')

exports.registerTheoryTest = async (req, res) => {
  const { technology_id, level } = req.body

  const contract = new ValidationContract()
  contract.isRequired(technology_id, 'O campo tecnologia não pode ser vazio')
  contract.isRequired(level, 'O campo nível não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await TheoryTestRepository.create({
      technology_id,
      level,
    })

    res.status(201).json({
      message: 'Teste teórico cadastrado com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
