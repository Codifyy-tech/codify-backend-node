const ClassService = require('../Class/ClassService');
const UserClassRepository = require('./UserClassRepository');
const CourseRepository = require('../Course/CourseRepository');

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

exports.getRegisteredUserCourses = async (userId) => {
    let courses = await UserClassRepository.findByUser(userId, {
        course_id: 1,
        _id: 0
    });

    courses = courses.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))

    var list_course = [];
    for (let course in courses) {
        let courseInfo = await CourseRepository.findOne({
            id: course.id
        })

        list_course.push(courseInfo)
    }

    return list_course;
}