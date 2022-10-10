const QuestionRepository = require('./QuestionRepository')
const ValidationContract = require('../../services/validatorService')

exports.registerQuestion = async (req, res) => {
  const { technology_id, description, topic } = req.body

  const contract = new ValidationContract()
  contract.isRequired(technology_id, 'O campo tecnologia não pode ser vazio')
  contract.isRequired(description, 'O campo descrição não pode ser vazio')
  contract.isRequired(topic, 'O campo tópico não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await QuestionRepository.create({
      technology_id,
      description,
      topic,
    })

    res.status(201).json({
      message: 'Pergunta cadastrada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
