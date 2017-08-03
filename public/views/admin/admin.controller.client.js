(function () {
    angular
        .module("JobHunter")
        .controller("AdminController", AdminController);

    function AdminController($timeout) {
        console.log("clicked");
        // $scope.toggleLeft = buildToggler('left');
        // $scope.toggleRight = buildToggler('right');

        // function buildToggler(componentId) {
        //     return function() {
        //         $mdSidenav(componentId).toggle();
        //     };
        // }
    }
})();