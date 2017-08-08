(function () {
    angular
        .module("JobHunter")
        .controller("CourseListController", CourseListController)
        .controller("EditCourseController", EditCourseController)
        .controller("NewCourseController", NewCourseController);

    function CourseListController(loggedin, $location, $sce, UserService, CourseService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        vm.trustThisContent = trustThisContent;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        CourseService
            .findCoursesByUser(vm.uid)
            .then(renderCourses);

        function renderCourses(courses) {
            vm.courses = courses;
        }

        function trustThisContent(html) {
            // diligence to scrub unsafe content
            return $sce.trustAsHtml(html);
        }
    }

    function EditCourseController(loggedin, $routeParams, $location, $timeout, UserService, CourseService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.cid = $routeParams.cid;
        vm.logout = logout;

        vm.updateCourse = updateCourse;
        vm.deleteCourse = deleteCourse;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        CourseService
            .findCourseById(vm.cid)
            .then(function (course) {
                vm.course = course;
            }, function (error) {
                vm.error = "Cannot find such a course";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        function updateCourse(newCourse) {
            // console.log("in service: do update Course");
            CourseService
                .updateCourse(vm.cid, newCourse)
                .then(function () {
                    vm.updated = "Course changes saved!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });

        }

        function deleteCourse(course) {
            CourseService
                .deleteCourse(vm.uid, course._id)
                .then(function () {
                    $location.url("/course");
                }, function (error) {
                    vm.error = "Unable to remove this course";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
    }

    function NewCourseController(loggedin, $location, UserService, CourseService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        vm.createCourse = createCourse;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function createCourse(course) {
            CourseService
                .createCourse(vm.uid, course)
                .then(function () {
                    $location.url('/course');
                })
        }
    }
})();