const ClassService = require('../Class/ClassService');
const UserClassRepository = require('./UserClassRepository');
const CourseRepository = require('../Course/CourseRepository');

exports.registerUserIntoCourse = async (courseId, userId) => {
    let classes = await ClassService.getClass(courseId);
    
    let classesWithUser = [];

    for (let classInfo of classes) {
        classesWithUser.push({
            ...classInfo._doc,
            user_id: userId
        })
    }

    await UserClassRepository.create(classesWithUser);
}

exports.getRegisteredUserCourses = async (userId) => {
    var list_course = [];

    let classes = await UserClassRepository.findByUser(userId, {
        course_id: 1,
        _id: 0
    });

    let courses = classes.filter(function (a) {
        return !this[JSON.stringify(a.course_id)] && (this[JSON.stringify(a.course_id)] = true);
    }, Object.create(null))

    for (let classInfo of courses) {
        var qtdwatched = 0;

        let course_info = await CourseRepository.findOne({
            _id: classInfo.course_id
        })

        let classesTest = await UserClassRepository.findByUserAndCourse(userId, classInfo.course_id);

        for( let item of classesTest) {
            if(item.watched == true) qtdwatched += 1;
        }

        list_course.push({
            course_info,
            progress: Math.round((qtdwatched * 100) / classesTest.length)
        })
    }

    return list_course;
}

exports.listClassesUserCourse = async (userId, courseId) => {
    
    let classes = await UserClassRepository.findByUserAndCourse(userId, courseId);

    return classes;
}

exports.editClassUserCourse = async (userId, classId, data) => {
    let classInfo = await UserClassRepository.update(userId, classId, data);

    return classInfo;
}