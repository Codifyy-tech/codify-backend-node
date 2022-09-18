const Class = require('./Class');

exports.getClass = async (courseId) => {
    const classes = await Class.find({
        course_id: courseId
    })

    if(!classes.length) {
        throw new Error('Nenhuma aula encontrada')
    } else {
        return classes
    }
}