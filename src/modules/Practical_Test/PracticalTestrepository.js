const PracticalTest = require('./Practical_Test')

exports.create = async (practicalTestInfo) => {
  const testAlreadyExists = await PracticalTest.findOne({
    url: practicalTestInfo.url,
  })

  if (!testAlreadyExists) {
    await PracticalTest.create(practicalTestInfo)
  } else {
    throw new Error('Aula já cadastrada')
  }
}
