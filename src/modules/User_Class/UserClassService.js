const ClassService = require('../Class/ClassService')
const UserClassRepository = require('./UserClassRepository')
const CourseRepository = require('../Course/CourseRepository')

exports.registerUserIntoCourse = async (courseId, userId) => {
  const classes = await ClassService.getClass(courseId)

  const classesWithUser = []

  for (const classInfo of classes) {
    classesWithUser.push({
      ...classInfo._doc,
      user_id: userId,
    })
  }

  await UserClassRepository.create(classesWithUser)
}

exports.getRegisteredUserCourses = async (userId) => {
  const list_course = []

  const classes = await UserClassRepository.findByUser(userId, {
    course_id: 1,
    _id: 0,
  })

  const courses = classes.filter(function (a) {
    return (
      !this[JSON.stringify(a.course_id)] &&
      (this[JSON.stringify(a.course_id)] = true)
    )
  }, Object.create(null))

  for (const classInfo of courses) {
    let qtdwatched = 0

    const course_info = await CourseRepository.findOne({
      _id: classInfo.course_id,
    })

    const classesTest = await UserClassRepository.findByUserAndCourse(
      userId,
      classInfo.course_id,
    )

    for (const item of classesTest) {
      if (item.watched === true) qtdwatched += 1
    }

    list_course.push({
      course_info,
      progress: Math.round((qtdwatched * 100) / classesTest.length),
    })
  }

  return list_course
}

exports.listClassesUserCourse = async (userId, courseId) => {
  const classes = await UserClassRepository.findByUserAndCourse(
    userId,
    courseId,
  )

  return classes
}

exports.editClassUserCourse = async (userId, classId, data) => {
  const classInfo = await UserClassRepository.update(userId, classId, data)

  return classInfo
}
