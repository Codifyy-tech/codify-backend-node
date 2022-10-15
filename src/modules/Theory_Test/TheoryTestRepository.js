const { ObjectId } = require('mongodb')
const TheoryTest = require('./Theory_Test')

exports.create = async (theoryTestInfo) => {
  const testAlreadyExists = await TheoryTest.findOne({
    technology_id: theoryTestInfo.technology_id,
  })

  if (!testAlreadyExists) {
    await TheoryTest.create(theoryTestInfo)
  } else {
    throw new Error('Teste teórico já cadastrado')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await TheoryTest.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.findById = async (companyId) => {
  const practicalTestExists = await TheoryTest.findById(ObjectId(companyId))

  if (practicalTestExists) {
    return practicalTestExists
  } else {
    throw new Error('Teste teórico não cadastrada')
  }
}
