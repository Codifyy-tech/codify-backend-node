const { ObjectId } = require('mongodb');
const Course = require('./Course');

exports.create = async (CourseInfo) => {
    const CourseAlreadyExists = await Course.findOne({ url: CourseInfo.url });

    if (!CourseAlreadyExists) {
        await Course.create(CourseInfo);
    } else {
        throw new Error("Curso já cadastrado");
    }
};

exports.findOne = async (CourseInfo, projection) => {
    const CourseExists = await Course.findOne(CourseInfo, projection);

    if (!CourseExists) {
        throw new Error("Usuário não encontrado");
    } else {
        return CourseExists
    }
}

exports.find = async (filter, pageSize, page, projection) => {
    return await Course.find(filter, projection)
        .skip(page > 0 ? ((page - 1) * pageSize) : 0)
        .limit(pageSize)
}

exports.update = async (CourseId, CourseInfo) => {
    return await Course.findByIdAndUpdate({ _id: ObjectId(CourseId) }, CourseInfo);
}

exports.delete = async (id) => {
    return await Course.findOneAndDelete({ _id: ObjectId(id) });
}