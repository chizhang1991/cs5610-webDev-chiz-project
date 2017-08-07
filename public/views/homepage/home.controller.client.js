(function () {
    angular
        .module("JobHunter")
        .controller("HomeController", HomeController);

    function HomeController(loggedin, UserService, CourseService, $location) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        // console.log(loggedin);

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }
    }
})();