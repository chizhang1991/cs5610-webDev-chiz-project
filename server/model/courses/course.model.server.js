module.exports = function(mongoose, userModel) {
    var courseSchema = require('./course.schema.server')(mongoose);
    var courseModel = mongoose.model('courseModel', courseSchema);

    var api = {
        'createCourseForUser': createCourseForUser,
        'findAllCoursesForUser': findAllCoursesForUser,
        'findCourseById': findCourseById,
        'updateCourse': updateCourse,
        // 'removePageFromcourse': removePageFromcourse,
        'deleteCourse': deleteCourse,
        // 'findAllCourses' : findAllCourse
        // 'addPageTocourse' : addPageTocourse
    };

    return api;

    function createCourseForUser(userId, course) {
        // console.log(course);
        course._user = userId;
        return courseModel
            .create(course)
            .then(
                function (course) {
                    return userModel
                        .addCourseForUser(userId, course._id)
                });
    }

    function findAllCoursesForUser(userId) {
        return courses = courseModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }

    function findCourseById(courseId) {
        return courseModel.findOne({_id: courseId});
    }

    function updateCourse(courseId, course) {
        return courseModel.update({
            _id : courseId
        }, {
            name: course.name,
            description: course.description
        });
    }

    function removePageFromCourse(courseId, pageId) {
        courseModel
            .findOne({_id: courseId})
            .then(
                function(course){
                    var index = course.pages.indexOf(pageId);
                    course.pages.splice(index, 1);
                    // course.pages.pull(pageId);
                    course.save();
                },
                function(error){
                    console.log(error);
                }
            );
    }

    function addPageToCourse(courseId, pageId) {
        return courseModel
            .findOne({_id: courseId})
            .then(function (course) {
                course.pages.push(pageId);
                return course.save();
            });
    }

    function deleteCourse(userId, courseId) {
        return courseModel
            .remove({_id: courseId})
            .then(
                function (status) {
                    return userModel
                        .removeCourseFromUser(userId, courseId);
                }
            );
    }

    function findAllCourses() {
        return courseModel.find();
    }

};