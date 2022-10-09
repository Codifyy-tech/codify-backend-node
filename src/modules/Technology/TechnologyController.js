const ValidationContract = require('../../services/validatorService')
const TechnologyRepository = require('./TechnologyRepository')

exports.registerTechnology = async (req, res) => {
  const { name, color, icon } = req.body

  const contract = new ValidationContract()
  contract.isRequired(name, 'O campo nome não pode ser vazio')
  contract.isRequired(color, 'O campo cor não pode ser vazio')
  contract.isRequired(icon, 'O campo ícone não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await TechnologyRepository.create({
      name,
      color,
      icon,
    })

    res.status(201).json({
      message: 'Tecnologia cadastrada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.listTechnology = async (req, res) => {
  try {
    const technologyInfo = await TechnologyRepository.find()

    res.status(200).send({
      data: technologyInfo,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
