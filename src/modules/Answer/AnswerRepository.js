const { ObjectId } = require('mongodb')
const Answer = require('./Answer')

exports.create = async (questionInfo) => {
  const answerAlreadyExists = await Answer.findOne({
    description: questionInfo.description,
  })

  if (!answerAlreadyExists) {
    await Answer.create(questionInfo)
  } else {
    throw new Error('Resposta já cadastrada')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await Answer.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.findOne = async (answer_id, projection) => {
  const answerExists = await Answer.findOne(answer_id, projection)

  if (!answerExists) {
    throw new Error('Resposta não encontrada')
  } else {
    return answerExists
  }
}

exports.findById = async (questionId) => {
  const answerExists = await Answer.findById(ObjectId(questionId))

  if (answerExists) {
    return answerExists
  } else {
    throw new Error('Resposta não cadastrada')
  }
}

exports.findByQuestion = async (filter, projection) => {
  const answerExists = await Answer.findOne(filter, projection)

  if (!answerExists) {
    throw new Error('Resposta não encontrada')
  } else {
    return answerExists
  }
}
