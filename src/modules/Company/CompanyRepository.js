const { ObjectId } = require('mongodb')
const Company = require('./Company')

exports.create = async (companyInfo) => {
  const companyAlreadyExists = await Company.findOne({ cpnj: companyInfo.cpnj })
  if (!companyAlreadyExists) {
    await Company.create(companyInfo)
  } else {
    throw new Error('Empresa já cadastrada')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await Company.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.findById = async (companyId) => {
  const companyExists = await Company.findById(ObjectId(companyId))

  if (companyExists) {
    return companyExists
  } else {
    throw new Error('Empresa não cadastrada')
  }
}
