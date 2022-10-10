const QuestionRepository = require('./QuestionRepository')
const AnswerRepository = require('../Answer/AnswerRepository')
const ValidationContract = require('../../services/validatorService')

exports.registerQuestion = async (req, res) => {
  const { theory_test_id, description, topic } = req.body

  const contract = new ValidationContract()
  contract.isRequired(
    theory_test_id,
    'O campo teste teórico não pode ser vazio',
  )
  contract.isRequired(description, 'O campo descrição não pode ser vazio')
  contract.isRequired(topic, 'O campo tópico não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await QuestionRepository.create({
      theory_test_id,
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

exports.infoQuestion = async (req, res) => {
  try {
    const { id } = req.params

    const questionsWithAnswer = []

    const questions = await QuestionRepository.find({ theory_test_id: id })

    for (const question of questions) {
      const answers = await AnswerRepository.find(
        { question_id: question._id },
        null,
        null,
        {
          description: 1,
        },
      )

      questionsWithAnswer.push({
        _id: questions.id,
        technology_id: questions.technology_id,
        description: question.description,
        topic: questions.topic,
        answers,
      })
    }

    res.status(200).send({
      data: questionsWithAnswer,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
