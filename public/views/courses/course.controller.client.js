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

    function EditCourseController(loggedin, $location, UserService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
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