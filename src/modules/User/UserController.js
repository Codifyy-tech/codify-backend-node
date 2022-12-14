/* eslint-disable no-fallthrough */
const ValidationContract = require('../../services/validatorService')
const UserClassService = require('../User_Class/UserClassService')
const AuthService = require('../../services/authService')
const UserRepository = require('./UserRepository')
const UserService = require('./UserService')
const mailService = require('../../services/mailService')
const utility = require('../../utils/utility')
const UserCourseRepository = require('../../modules/User_Course/UserCourseRepository')
const md5 = require('md5')

exports.checkToken = async (req, res) => {
  const current_user = req.user

  try {
    const userInfo = await UserService.checkUserIsValid(current_user, {
      name: 1,
      email: 1,
      type: 1,
      firstLetter: 1,
    })

    res.status(200).send(userInfo)
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.authenticateUser = async (req, res) => {
  const { email, password } = req.body

  const contract = new ValidationContract()
  contract.isRequired(email, 'O campo email não pode ser vazio')
  contract.isRequired(password, 'O campo senha não pode ser vazio')

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    const userInfo = await UserRepository.findOne(
      {
        email,
        password: md5(password + process.env.SALT_KEY),
      },
      { name: 1, email: 1, firstLetter: 1, type: 1 },
    )

    const token = await AuthService.generateToken(userInfo)

    console.log(userInfo.type)

    res.status(200).send({
      token,
      type: userInfo.type,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.signUp = async (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    confirm_password,
    birth_date,
    genre,
    cep,
    address,
    city,
    district,
    state,
  } = req.body

  const contract = new ValidationContract()
  contract.isRequired(name, 'O campo nome não pode ser vazio')
  contract.isEmail(email, 'E-mail inválido')
  contract.isGenreValid(genre, 'Gênero inválido')
  contract.isRequired(
    birth_date,
    'O campo data de nascimento não pode ser vazio',
  )
  contract.isRequired(address, 'O campo endereço não pode ser vazio')
  contract.isRequired(cep, 'O campo cep não pode ser vazio')
  contract.isRequired(password, 'O campo senha não pode ser vazio')
  contract.isRequired(
    confirm_password,
    'O campo confirmação de senha não pode ser vazio',
  )
  contract.checkMatchPassword(
    password,
    confirm_password,
    'As senhas não correspondem',
  )

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  try {
    await mailService.sendEmail({
      email,
      subject: 'Bem vindo à Codify!',
      payload: {
        name,
      },
      template: '../template/newUser.handlebars',
    })

    await UserRepository.create({
      name,
      firstLetter: utility.splitName(name),
      email,
      phone,
      password: md5(password + process.env.SALT_KEY),
      birth_date,
      genre,
      cep,
      address,
      city,
      district,
      state,
      type: 'user',
    })

    const userInfo = await UserRepository.findOne(
      {
        email,
        password: md5(password + process.env.SALT_KEY),
      },
      { name: 1, email: 1, firstLetter: 1 },
    )

    const token = await AuthService.generateToken(userInfo)

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token,
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.infoUser = async (req, res) => {
  const current_user = req.user

  try {
    const userInfo = await UserRepository.findOne(
      {
        _id: current_user,
      },
      { name: 1, email: 1, firstLetter: 1 },
    )

    const courses_registered = await UserClassService.getRegisteredUserCourses(
      current_user,
    )

    const alreadyCompletedCourse = courses_registered.filter(
      ({ progress }) => progress === 100,
    )

    for (const course of alreadyCompletedCourse) {
      await UserCourseRepository.registerCompletedCourse(
        current_user,
        course.course_info._id,
      )
    }

    res.status(200).send({
      userInfo,
      courses_registered,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.editInfo = async (req, res) => {
  const current_user = req.user
  let { current_password, new_password, confirm_new_password } = req.body

  const contract = new ValidationContract()
  contract.isRequired(
    current_password,
    'O campo senha atual não pode ser vazio',
  )
  contract.checkMatchPassword(
    new_password,
    confirm_new_password,
    'As senhas não correspondem',
  )

  if (!contract.isValid()) {
    res.status(400).send(contract.errors()).end()
    return
  }

  current_password = md5(current_password + process.env.SALT_KEY)

  try {
    await UserService.checkCurrentPassword(current_user, current_password)

    await UserRepository.update(current_user, {
      password: md5(new_password + process.env.SALT_KEY),
    })

    res.status(200).json({
      data: 'Senha modificada com sucesso',
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.dashboard = async (req, res) => {
  try {
    const maleUsers = await UserRepository.find({
      genre: 'H',
    })
    const femaleUsers = await UserRepository.find({
      genre: 'M',
    })
    const nonBinaryUsers = await UserRepository.find({
      genre: 'NB',
    })

    const uninformed = await UserRepository.find({
      genre: 'NI',
    })
    const total = await UserRepository.find({})

    res.status(200).send({
      male: maleUsers.length,
      female: femaleUsers.length,
      non_binary: nonBinaryUsers.length,
      uninformed: uninformed.length,
      total: total.length,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.listUsers = async (req, res) => {
  try {
    const list_user = []
    // eslint-disable-next-line no-var
    var rank = {}

    const users = await UserRepository.find({})

    for (const user of users) {
      const quantityCourseCompleted = await UserCourseRepository.find({
        user_id: user.id,
      })

      if (
        quantityCourseCompleted.length >= 0 &&
        quantityCourseCompleted.length <= 3
      ) {
        rank.name = 'bronze'
        rank.color = '#CD7F32'
      }
      if (
        quantityCourseCompleted.length > 3 &&
        quantityCourseCompleted.length <= 6
      ) {
        rank.name = 'silver'
        rank.color = '#ACAFAC'
      }
      if (
        quantityCourseCompleted.length > 6 &&
        quantityCourseCompleted.length <= 10
      ) {
        console.log('oi')
        rank.name = 'gold'
        rank.color = '#DAA520'
      }
      if (
        quantityCourseCompleted.length > 10 &&
        quantityCourseCompleted.length <= 3
      ) {
        rank.name = 'diamond'
        rank.color = '#44CAE9'
      }

      const array_name = user.name.split(' ')

      list_user.push({
        _id: user._id,
        first_letter: user.firstLetter,
        email: user.email,
        name: `${array_name[0]} ${array_name[array_name.length - 1]}`,
        rank,
      })

      rank = {}
    }

    res.status(200).send({
      list_user,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}

exports.infoDashboardUser = async (req, res) => {
  const { id } = req.params

  const rank = {}

  try {
    const userInfo = await UserRepository.findOne(
      {
        _id: id,
      },
      { name: 1, email: 1, firstLetter: 1, genre: 1 },
    )

    const courses_registered = await UserClassService.getRegisteredUserCourses(
      id,
    )

    const quantityCourseCompleted = await UserCourseRepository.find({
      user_id: id,
    })

    if (
      quantityCourseCompleted.length >= 0 &&
      quantityCourseCompleted.length <= 3
    ) {
      rank.name = 'bronze'
      rank.color = '#CD7F32'
    }
    if (
      quantityCourseCompleted.length > 3 &&
      quantityCourseCompleted.length <= 6
    ) {
      rank.name = 'silver'
      rank.color = '#ACAFAC'
    }
    if (
      quantityCourseCompleted.length > 6 &&
      quantityCourseCompleted.length <= 10
    ) {
      console.log('oi')
      rank.name = 'gold'
      rank.color = '#DAA520'
    }
    if (
      quantityCourseCompleted.length > 10 &&
      quantityCourseCompleted.length <= 3
    ) {
      rank.name = 'diamond'
      rank.color = '#44CAE9'
    }

    res.status(200).send({
      userInfo,
      level: rank,
      courses_registered,
    })
  } catch (e) {
    res.status(400).json({ message: e.message })
  }
}
