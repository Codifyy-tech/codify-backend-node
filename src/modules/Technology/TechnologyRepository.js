const Technology = require('./Technology')

exports.create = async (technologyInfo) => {
  const technologyAlreadyExists = await Technology.findOne({
    name: technologyInfo.name,
  })
  if (!technologyAlreadyExists) {
    await Technology.create(technologyInfo)
  } else {
    throw new Error('Tecnologia já cadastrada')
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await Technology.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}
