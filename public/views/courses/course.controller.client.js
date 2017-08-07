(function () {
    angular
        .module("JobHunter")
        .controller("CourseListController", CourseListController)
        .controller("EditCourseController", EditCourseController)
        .controller("NewCourseController", NewCourseController);

    function CourseListController(loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
    }

    function EditCourseController(loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
    }

    function NewCourseController(loggedin) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
    }
})();