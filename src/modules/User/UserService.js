const { ObjectId } = require('mongodb');
const User = require('../User/User');

exports.checkUserIsValid = async (userId, projection) => {
    let userExists = await User.findById(ObjectId(userId), projection);

    if (!userExists) {
        throw new Error("Usuário não encontrado");
    } else {
        return userExists
    }
}

exports.checkCurrentPassword = async (current_user, current_password) => {
    const userInfo = await User.findOne({
        _id: current_user
    }, { name: 1, email: 1, firstLetter: 1, password: 1});

    if(current_password != userInfo.password) {
        throw new Error("Senha atual incorreta")
    }
}