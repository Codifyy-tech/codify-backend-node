const ValidationContract = require('../../services/validatorService')
const CourseRepository = require('./CourseRepository')
const TechnologyRepository = require('../Technology/TechnologyRepository')
const UserClassService = require('../User_Class/UserClassService')

exports.registerCourse = async (req, res) => {
  const { title, author, description, category, technology_id, topics, url } =
    req.body

  const contract = new ValidationContract()
  contract.isRequired(title, 'O campo título não pode ser vazio')
  contract.isRequired(author, 'O campo autor não pode ser vazio')
  contract.isRequired(description, 'O campo descrição não pode ser vazio')
  contract.isRequired(category, 'O campo categoria não pode ser vazio')
  contract.isRequired(technology_id, 'O campo tecnologia não pode ser vazio')
  contract.isRequired(topics, 'O campo tópicos não pode ser vazio')
  contract.isRequired(url, 'O campo url não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await CourseRepository.create({
      title,
      author,
      description,
      category,
      technology_id,
      topics,
      url,
    })

    res.status(201).json({
      message: 'Curso cadastrado com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.registerUserCourse = async (req, res) => {
  const { course_id } = req.body
  const user_id = req.user

  const contract = new ValidationContract()
  contract.isRequired(course_id, 'O campo curso não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await UserClassService.registerUserIntoCourse(course_id, user_id)

    res.status(201).json({
      message: 'Inscrito com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.infoCourse = async (req, res) => {
  const { id } = req.params

  try {
    const courseInfo = await CourseRepository.findOne({
      _id: id,
    })

    const technology = await TechnologyRepository.findById(
      courseInfo.technology_id,
    )

    res.status(200).send({
      data: {
        _id: courseInfo._id,
        title: courseInfo.title,
        author: courseInfo.author,
        technology,
        description: courseInfo.description,
        category: courseInfo.category,
        topics: courseInfo.topics,
        url: courseInfo.url,
      },
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.listCourse = async (req, res) => {
  const { category } = req.query

  const list_course = []

  try {
    const courseInfo = await CourseRepository.find({
      category,
    })

    for (const course of courseInfo) {
      const technology = await TechnologyRepository.findById(
        course.technology_id,
      )

      list_course.push({
        _id: course._id,
        title: course.title,
        author: course.author,
        technology,
        description: course.description,
        category: course.category,
        topics: course.topics,
        url: course.url,
      })
    }

    res.status(200).send({
      data: list_course,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
