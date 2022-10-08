const { ObjectId } = require('mongodb')
const User = require('./User')

exports.create = async (userInfo) => {
  const userAlreadyExists = await User.findOne({ email: userInfo.email })

  if (!userAlreadyExists) {
    await User.create(userInfo)
  } else {
    throw new Error('E-mail já cadastrado')
  }
}

exports.findOne = async (userInfo, projection) => {
  const userExists = await User.findOne(userInfo, projection)

  if (!userExists) {
    throw new Error('Usuário não encontrado')
  } else {
    return userExists
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await User.find(filter, projection)
    .sort({ active: -1 })
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}

exports.update = async (userId, userInfo) => {
  return await User.findByIdAndUpdate({ _id: ObjectId(userId) }, userInfo)
}

exports.delete = async (userId) => {
  return await User.findOneAndDelete({ _id: ObjectId(userId) })
}
