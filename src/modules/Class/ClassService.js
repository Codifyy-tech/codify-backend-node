const Class = require('./Class')

exports.getClass = async (courseId) => {
  const classes = await Class.find(
    {
      course_id: courseId,
    },
    { _id: 0 },
  )

  if (!classes.length) {
    throw new Error('Nenhuma aula encontrada')
  } else {
    return classes
  }
}
