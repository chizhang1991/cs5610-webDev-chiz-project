(function () {
    angular
        .module("JobHunter")
        .factory('CourseService', CourseService);

    function CourseService($http) {

        var services = {
            'createCourse': createCourse,
            'findCoursesByUser': findCoursesByUser,
            'findCourseById': findCourseById,
            'updateCourse': updateCourse,
            'deleteCourse': deleteCourse,
            'getTrend' : getTrend
            // 'deleteCoursesByUser': deleteCoursesByUser
        };
        return services;

        function createCourse(userId, course) {
            var url = "/api/user/" + userId + "/course";
            return $http.post(url, course)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function findCoursesByUser(userId) {
            var url = "/api/user/" + userId + "/course";
            return $http.get(url)
                .then(
                    function (response) {
                        return response.data;
                    });
        }

        function findCourseById(courseId) {
            var url = "/api/course/" + courseId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateCourse(courseId, course) {
            var url = "/api/course/" + courseId;
            return $http.put(url, course)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteCourse(userId, courseId) {
            var url = "/api/user/" + userId + "/course/" + courseId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
        //
        // function deleteCoursesByUser(userId) {
        //     for (c in courses) {
        //         course = courses[c];
        //         if (course.developerId === userId) {
        //             deletecourse(course._id);
        //         }
        //     }
        // }

        function getTrend(course) {
            var url = "api/trend/" + course._id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }
    }
})();