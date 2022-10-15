/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
const UserTheoryTestRepository = require('./UserTheoryTestRepository')

exports.verifyUserPassed = async (userId, theoryTestId) => {
  const approved = await UserTheoryTestRepository.findOne(userId, theoryTestId)

  return approved
}
