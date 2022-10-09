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
