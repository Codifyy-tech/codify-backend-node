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

exports.find = async (filter, pageSize, page, projection) => {
  return await PracticalTest.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}
