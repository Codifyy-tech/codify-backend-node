const AnswerRepository = require('./AnswerRepository')
const ValidationContract = require('../../services/validatorService')

exports.registerAnswer = async (req, res) => {
  const { question_id, description, status } = req.body

  const contract = new ValidationContract()
  contract.isRequired(question_id, 'O campo pergunta não pode ser vazio')
  contract.isRequired(description, 'O campo descrição não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await AnswerRepository.create({
      question_id,
      description,
      status,
    })

    res.status(201).json({
      message: 'Resposta cadastrada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
