(function () {
    angular
        .module("JobHunter")
        .controller("HomeController", HomeController);

    function HomeController(loggedin, UserService, CourseService, JobService, $location) {
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