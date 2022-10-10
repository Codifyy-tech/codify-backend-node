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
  const userExists = await Answer.findOne(answer_id, projection)

  if (!userExists) {
    throw new Error('Usuário não encontrado')
  } else {
    return userExists
  }
}
