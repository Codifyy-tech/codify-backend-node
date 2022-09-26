const ValidationContract = require('../../services/validatorService');
const ClassRepository = require('./ClassRepository');
const UserClassService = require('../User_Class/UserClassService');
const axios = require('axios');

exports.registerClass = async (req, res) => {
    let { items, course_id } = req.body;

    let list_class = [];

    for (let i in items) {

        try {
            var video = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails&id=${items[i].snippet.resourceId.videoId}&key=AIzaSyC5bCjajo8lmTOHpCTj2JLYCk2im-Ol0cw`);
        } catch (e) {
            throw new Error("Vídeo não encontrado")
        }

        list_class.push({
            title: items[i].snippet.title,
            number: items[i].snippet.position,
            description: items[i].snippet.description ?? "",
            url: `https://youtu.be/${items[i].snippet.resourceId.videoId}`,
            author: items[i].snippet.videoOwnerChannelTitle,
            duration: video.data.items[0].contentDetails.duration,
            course_id,
        })
    }

    try {

        await ClassRepository.create(list_class);

        res.status(201).json({
            message: 'Aula cadastrada com sucesso',
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

exports.listClasses = async (req, res) => {
    let { id } = req.params;
    let current_user = req.user;
    let qtdwatched = 0;

    try {
        let classes = await UserClassService.listClassesUserCourse(current_user, id);

        for (let item of classes) {
            if(item.watched == true) qtdwatched += 1;
        }

        res.status(201).json({
            data: classes,
            progress: Math.round((qtdwatched * 100) / classes.length)
        });

        qtdwatched = 0;
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

exports.editClass = async (req, res) => {
    let { id } = req.params;
    let current_user = req.user;
    let { watched } = req.body;

    try {
        await UserClassService.editClassUserCourse(current_user, id, {
            watched
        });

        res.status(201).json({
            message: "Aula alterada com sucesso",
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};