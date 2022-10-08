const ClassRepository = require('./ClassRepository')
const UserClassService = require('../User_Class/UserClassService')
const axios = require('axios')

exports.registerClass = async (req, res) => {
  const { items, course_id } = req.body

  const list_class = []

  for (const i in items) {
    try {
      // eslint-disable-next-line no-var
      var video = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${items[i].snippet.resourceId.videoId}&key=AIzaSyC5bCjajo8lmTOHpCTj2JLYCk2im-Ol0cw`,
      )
    } catch (e) {
      throw new Error('Vídeo não encontrado')
    }

    list_class.push({
      title: items[i].snippet.title,
      number: items[i].snippet.position,
      description: items[i].snippet.description ?? '',
      url: `https://youtu.be/${items[i].snippet.resourceId.videoId}`,
      author: items[i].snippet.videoOwnerChannelTitle,
      duration: video.data.items[0].contentDetails.duration,
      course_id,
    })
  }

  try {
    await ClassRepository.create(list_class)

    res.status(201).json({
      message: 'Aula cadastrada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.listClasses = async (req, res) => {
  const { id } = req.params
  const current_user = req.user
  let qtdwatched = 0

  try {
    const classes = await UserClassService.listClassesUserCourse(
      current_user,
      id,
    )

    for (const item of classes) {
      if (item.watched === true) qtdwatched += 1
    }

    res.status(201).json({
      data: classes,
      progress: Math.round((qtdwatched * 100) / classes.length),
    })

    qtdwatched = 0
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}

exports.editClass = async (req, res) => {
  const { id } = req.params
  const current_user = req.user
  const { watched } = req.body

  try {
    await UserClassService.editClassUserCourse(current_user, id, {
      watched,
    })

    res.status(201).json({
      message: 'Aula alterada com sucesso',
    })
  } catch (e) {
    res.status(400).json({
      message: e.message,
    })
  }
}
