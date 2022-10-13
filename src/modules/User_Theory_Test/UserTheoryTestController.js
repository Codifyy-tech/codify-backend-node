/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
const UserTheoryTestRepository = require('./UserTheoryTestRepository')

exports.verifyUserPassed = async (req, res) => {
  const current_user = req.user
  const { id } = req.params

  try {
    const approved = await UserTheoryTestRepository.findOne(current_user, id)

    res.status(201).json({
      approved,
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
