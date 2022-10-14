const AnswerRepository = require('../Answer/AnswerRepository')
const QuestionRepository = require('../Question/QuestionRepository')

exports.checkAnswerQuestion = async (answerUserId, questionId) => {
  const questionAnswerCorrect = await AnswerRepository.findByQuestion({
    question_id: questionId,
    status: true,
  })

  const questionInfo = await QuestionRepository.findById(questionId)
  const answerInfo = await AnswerRepository.findById(answerUserId)
  const scored = questionAnswerCorrect.description === answerInfo.description

  return {
    question: questionInfo.description,
    answer_user: answerInfo.description,
    answer_correct: questionAnswerCorrect.description,
    topic: questionInfo.topic,
    scored,
  }
}
