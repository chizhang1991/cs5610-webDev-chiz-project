(function () {
    angular
        .module("JobHunter")
        .controller("CourseListController", CourseListController)
        .controller("EditCourseController", EditCourseController)
        .controller("NewCourseController", NewCourseController);

    function CourseListController(loggedin, $location, UserService) {
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

    function NewCourseController(loggedin, $location, UserService) {
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
})();