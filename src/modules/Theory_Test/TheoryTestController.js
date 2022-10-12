/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
const TheoryTestRepository = require('./TheoryTestRepository')
const AnswerService = require('../Answer/AnswerService')
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
  const { answer_list } = req.body

  const contract = new ValidationContract()
  contract.isRequired(answer_list, 'O campo questões não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    var corrects = 0

    for (const answer of answer_list) {
      const isCorrect = await AnswerService.checkAnswerIsCorrect(
        answer[Object.keys(answer)[0]],
        true,
      )

      if (isCorrect) {
        corrects++
      }
    }

    const percentageCorrects = Math.round((corrects * 100) / answer_list.length)

    res.status(201).json({
      data: {
        result: percentageCorrects,
      },
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
