(function () {
    angular
        .module("JobSearch")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl : "./home.html"
            })

            .when("/homepage", {
                templateUrl : "./views/homepage/template/homepage.html"
            })

            .otherwise({
                redirectTo : "/"
            });
    }
})();
// (function(){
//     angular
//         .module("JobSearch")
//         .config(configuration);
//
//     function configuration($routeProvider) {
//         $routeProvider
//
//             .when("/homepage", {
//                 templateUrl : "./views/homepage/template/homepage.html"
//             })
//             .when("/", {
//                 templateUrl : "./home.html"
//             })
//             .otherwise({
//                 redirectTo : "/"
//             });
//     }
// })();