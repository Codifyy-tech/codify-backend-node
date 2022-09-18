const { ObjectId } = require('mongodb');
const Class = require('./Class');

exports.create = async (ClassInfo) => {
    const ClassAlreadyExists = await Class.findOne({ url: ClassInfo.url });

    if (!ClassAlreadyExists) {
        await Class.create(ClassInfo);
    } else {
        throw new Error("Aula já cadastrada");
    }
};

exports.findOne = async (ClassInfo, projection) => {
    const ClassExists = await Class.findOne(ClassInfo, projection);

    if (!ClassExists) {
        throw new Error("Usuário não encontrado");
    } else {
        return ClassExists
    }
}

exports.find = async (filter, pageSize, page, projection) => {
    return await Class.find(filter, projection)
        .skip(page > 0 ? ((page - 1) * pageSize) : 0)
        .limit(pageSize)
}

exports.update = async (ClassId, ClassInfo) => {
    return await Class.findByIdAndUpdate({ _id: ObjectId(ClassId) }, ClassInfo);
}

exports.delete = async (ClassId) => {
    return await Class.findOneAndDelete({ _id: ObjectId(id) });
}