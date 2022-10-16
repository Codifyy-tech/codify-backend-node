const UserCourse = require('./UserCourse')

exports.registerCompletedCourse = async (userId, courseId) => {
  const userAlreadyCompletedCourse = await UserCourse.findOne({
    user_id: userId,
    course_id: courseId,
  })

  if (!userAlreadyCompletedCourse) {
    await UserCourse.create({
      user_id: userId,
      course_id: courseId,
    })
  }
}

exports.find = async (filter, pageSize, page, projection) => {
  return await UserCourse.find(filter, projection)
    .skip(page > 0 ? (page - 1) * pageSize : 0)
    .limit(pageSize)
}
