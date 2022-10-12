const { ObjectId } = require('mongodb')
const Question = require('./Question')

exports.create = async (questionInfo) => {
  const questionAlreadyExists = await Question.findOne({
    description: questionInfo.description,
  })

  if (!questionAlreadyExists) {
    await Question.create(questionInfo)
  } else {
    throw new Error('Pergunta já cadastrada')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await Question.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.findById = async (questionId) => {
  const questionExists = await Question.findById(ObjectId(questionId))

  if (questionExists) {
    return questionExists
  } else {
    throw new Error('Questão não cadastrada')
  }
}
