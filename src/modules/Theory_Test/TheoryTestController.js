/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
const TheoryTestRepository = require('./TheoryTestRepository')
const UserTheoryTestRepository = require('../User_Theory_Test/UserTheoryTestRepository')
const AnswerService = require('../Answer/AnswerService')
const ValidationContract = require('../../services/validatorService')
const QuestionService = require('../Question/QuestionService')

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

exports.listTheoryTests = async (req, res) => {
  const { level, technology_id } = req.query

  try {
    const filter = {}
    filter.technology_id = { $in: technology_id }
    filter.level = { $in: level }

    const theoryTests = await TheoryTestRepository.find(filter)

    res.status(200).send({
      data: theoryTests,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.resultTheoryTest = async (req, res) => {
  const current_user = req.user
  const { answer_list, theory_test_id } = req.body

  const contract = new ValidationContract()
  contract.isRequired(answer_list, 'O campo questões não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    var corrects = 0
    var questions = []

    for (const answer of answer_list) {
      const questionInfo = await QuestionService.checkAnswerQuestion(
        answer[Object.keys(answer)[0]],
        Object.keys(answer)[0],
      )

      if (questionInfo.scored === true) corrects++
      questions.push(questionInfo)
    }

    const percentageCorrects = Math.round((corrects * 100) / answer_list.length)
    const approved = percentageCorrects >= 80

    await UserTheoryTestRepository.update(
      current_user,
      theory_test_id,
      approved,
    )

    res.status(201).json({
      data: {
        result: percentageCorrects,
        approved,
        questions,
      },
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
