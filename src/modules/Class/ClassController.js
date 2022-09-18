const ValidationContract = require('../../services/validatorService');
const ClassRepository = require('./ClassRepository');

exports.registerClass = async (req, res) => {
    let {
        title,
        number,
        course_id,
        description,
        duration,
        url,
        watched } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(title, 'O campo título não pode ser vazio');
    contract.isRequired(number, 'O campo número não pode ser vazio');
    contract.isRequired(course_id, 'O campo curso não pode ser vazio');
    contract.isRequired(description, 'O campo descrição não pode ser vazio');
    contract.isRequired(duration, 'O campo duração não pode ser vazio');
    contract.isRequired(url, 'O campo url não pode ser vazio');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await ClassRepository.create({
            title,
            number,
            course_id,
            description,
            duration,
            url
        });

        res.status(201).json({
            message: 'Aula cadastrada com sucesso',
        });
    } catch (e) {
        res.status(400).json({
            message: e.message
        });
    }
};