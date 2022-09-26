const UserClass = require('./UserClass');
const { ObjectId } = require('mongodb');

exports.create = async (classesInfo) => {
    const ClassAlreadyRegistered = await Promise.all(classesInfo.map((classInfo) => {
        return UserClass.findOne({
            user_id: classInfo.user_id,
            course_id: classInfo.course_id
        })
    }))

    if (ClassAlreadyRegistered[0] == null) {
        await UserClass.create(classesInfo);
    } else {
        throw new Error("Usuário já cadastrado nesse curso");
    }
};

exports.update = async (userId, classId, data) => {
   await UserClass.findByIdAndUpdate({
    _id: ObjectId(classId),
    user_id: userId,
   }, data);
}

exports.findByUser = async (user_id, projection) => {
    let courses = await UserClass.find({
        user_id: user_id
    }, projection);

    return courses;
}

exports.findByUserAndCourse = async (userId, courseId) => {
    let classes = await UserClass.find({
        user_id: userId,
        course_id: courseId
    }).sort({number: 1});

    if (classes.length) {
        return classes;
    } else {
        throw new Error('Usuário não cadastrado no curso')
    }


}