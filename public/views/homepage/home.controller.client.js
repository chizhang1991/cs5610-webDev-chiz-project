(function () {
    angular
        .module("JobHunter")
        .controller("HomeController", HomeController);

    function HomeController(loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
    }
})();