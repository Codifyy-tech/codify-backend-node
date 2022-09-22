const UserClass = require('./UserClass');

exports.create = async (ClassInfo) => {
    const ClassAlreadyRegistered = await UserClass.findOne({ 
        user_id: ClassInfo.user_id,
        course_id: ClassInfo.course_id
    });

    if (!ClassAlreadyRegistered) {
        throw new Error("Usuário já cadastrado nesse curso");
    } else {
        await UserClass.create(ClassInfo);
    }
};

exports.findByUser = async (user_id, projection) => {
    let courses = await UserClass.find({
        user_id: user_id
    }, projection);

    return courses;
}