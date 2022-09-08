const ValidationContract = require('../../services/validatorService');
const UserRepository = require('./CourseRepository');
const CourseRepository = require('./CourseRepository');

exports.registerCourse = async (req, res) => {
    let { 
        title, 
        author, 
        description, 
        category, 
        technology, 
        topic } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(title, 'O campo título não pode ser vazio');
    contract.isRequired(author, 'O campo autor não pode ser vazio');
    contract.isRequired(description, 'O campo descrição não pode ser vazio');
    contract.isRequired(category, 'O campo categoria não pode ser vazio');
    contract.isRequired(technology, 'O campo tecnologia não pode ser vazio');
    contract.isRequired(topic, 'O campo tópicos não pode ser vazio');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await CourseRepository.create({
            title, 
            author, 
            description, 
            category, 
            technology, 
            topic });

        res.status(201).json({
            message: 'Curso cadastrado com sucesso',
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};

exports.infoUser = async (req, res) => {
    let current_user = req.user;

    try {
        const userInfo = await UserRepository.findOne({
            _id: current_user
        }, { name: 1, email: 1, firstLetter: 1});

        res.status(200).send({
            data: userInfo,
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}