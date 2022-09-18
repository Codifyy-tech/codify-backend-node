const ClassService = require('../Class/ClassService');
const UserClassRepository = require('./UserClassRepository');

exports.registerUserIntoCourse = async (courseId, userId) => {
    let classes = await ClassService.getClass(courseId);
    
    let classesWithUser = [];

    for (classInfo in classes) {
        classesWithUser.push({
            ...classes[classInfo]._doc,
            user_id: userId
        })
    }

    await UserClassRepository.create(classesWithUser);
}