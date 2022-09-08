const { connect } = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

exports.mongoConnect = async () => {
    try {
        connect(process.env.MONGO_URL);
    } catch {
        console.log("Erro conexão MongoDb: ", Error);
    }
};