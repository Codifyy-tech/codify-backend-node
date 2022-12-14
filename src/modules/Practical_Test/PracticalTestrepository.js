const { ObjectId } = require('mongodb')
const PracticalTest = require('./Practical_Test')

exports.create = async (practicalTestInfo) => {
  const testAlreadyExists = await PracticalTest.findOne({
    repository_url: practicalTestInfo.repository_url,
  })

  if (!testAlreadyExists) {
    await PracticalTest.create(practicalTestInfo)
  } else {
    throw new Error('Teste prático já cadastrado')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await PracticalTest.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.findById = async (companyId) => {
  const practicalTestExists = await PracticalTest.findById(ObjectId(companyId))

  if (practicalTestExists) {
    return practicalTestExists
  } else {
    throw new Error('Teste técnico não cadastrada')
  }
}
