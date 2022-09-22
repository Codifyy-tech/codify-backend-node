const ValidationContract = require('../../services/validatorService');
const UserClassService = require('../User_Class/UserClassService');
const AuthService = require('../../services/authService');
const UserRepository = require('./UserRepository');
const UserService = require('./UserService');
const mailService = require('../../services/mailService');
const utility = require('../../utils/utility');
const md5 = require('md5');

exports.checkToken = async (req, res) => {
    let current_user = req.user;

    try {
        const userInfo = await UserService.checkUserIsValid(current_user, 
            { name: 1, email: 1, type: 1, firstLetter: 1 })

        res.status(200).send(userInfo);

    } catch(e) {
        res.status(400).json({ message: e.message });
    }   
};

exports.authenticateUser = async (req, res) => {
    let { email, password } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(email, 'O campo email não pode ser vazio');
    contract.isRequired(password, 'O campo senha não pode ser vazio');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        const userInfo = await UserRepository.findOne({
            email,
            password: md5(password + process.env.SALT_KEY )
        }, { name: 1, email: 1, firstLetter: 1});

        const token = await AuthService.generateToken(userInfo);

        res.status(200).send({
            token: token,
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
};

exports.signUp = async (req, res) => {
    let { 
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
        state } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(name, 'O campo nome não pode ser vazio');
    contract.isEmail(email, 'E-mail inválido');
    contract.isGenreValid(genre, 'Gênero inválido');
    contract.isRequired(birth_date, 'O campo data de nascimento não pode ser vazio');
    contract.isRequired(address, 'O campo endereço não pode ser vazio');
    contract.isRequired(cep, 'O campo cep não pode ser vazio');
    contract.isRequired(city, 'O campo cidade não pode ser vazio');
    contract.isRequired(district, 'O campo bairro não pode ser vazio');
    contract.isStateValid(state, 'Estado Inválido');
    contract.isRequired(password, 'O campo senha não pode ser vazio');
    contract.isRequired(confirm_password, 'O campo confirmação de senha não pode ser vazio');
    contract.checkMatchPassword(password, confirm_password, 'As senhas não correspondem');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    try {
        await mailService.sendEmail({
            email,
            subject: "Bem vindo à Codify!",
            payload: {
                name,
            },
            template: "../template/newUser.handlebars"
        });

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
            type: "user"
        });

        const userInfo = await UserRepository.findOne({
            email,
            password: md5(password + process.env.SALT_KEY )
        }, { name: 1, email: 1, firstLetter: 1 });

        const token = await AuthService.generateToken(userInfo);

        res.status(201).json({
            message: 'Usuário cadastrado com sucesso',
            token
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

        const courses_registered = await UserClassService.getRegisteredUserCourses(current_user);

        res.status(200).send({
            userInfo,
            courses_registered
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

exports.editInfo = async (req, res) => {
    let current_user = req.user;
    let { current_password, new_password, confirm_new_password } = req.body;

    let contract = new ValidationContract();
    contract.isRequired(current_password, 'O campo senha atual não pode ser vazio');
    contract.checkMatchPassword(new_password, confirm_new_password, 'As senhas não correspondem');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    current_password = md5(current_password + process.env.SALT_KEY)

    try {
        await UserService.checkCurrentPassword(current_user, current_password);

        await UserRepository.update(current_user, {
            password: md5(new_password + process.env.SALT_KEY)
        })

        res.status(200).json({
            data: "Senha modificada com sucesso",
        });
    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}