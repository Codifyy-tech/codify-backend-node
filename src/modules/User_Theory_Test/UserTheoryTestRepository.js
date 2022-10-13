const UserTheoryTest = require('./User_Theory_Test')

exports.update = async (userId, theoryTestId, approved) => {
  await UserTheoryTest.updateOne(
    {
      user_id: userId,
      theory_test_id: theoryTestId,
    },
    {
      approved,
    },
    { upsert: true },
  )
}

exports.findOne = async (userId, theoryTestId) => {
  const resultExists = await UserTheoryTest.findOne({
    user_id: userId,
    theory_test_id: theoryTestId,
  })

  console.log(resultExists)

  if (!resultExists) {
    return false
  } else {
    return resultExists.approved
  }
}
