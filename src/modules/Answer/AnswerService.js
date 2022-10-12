const { ObjectId } = require('mongodb')
const AnswerRepository = require('./AnswerRepository')

exports.checkAnswerIsCorrect = async (answerId, status) => {
  const answerExists = await AnswerRepository.find({
    _id: ObjectId(answerId),
    status,
  })

  // eslint-disable-next-line no-extra-boolean-cast
  if (answerExists.length > 0) {
    return true
  } else {
    return false
  }
}
