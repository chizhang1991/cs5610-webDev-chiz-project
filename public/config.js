(function () {
    angular
        .module("JobHunter")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when("/", {
                templateUrl : "./home.html"
            })

            .when("/homepage", {
                templateUrl : "./views/homepage/home.view.client.html"
            })
            .when("/admin", {
                templateUrl: "./views/admin/admin.view.client.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "./views/user/login.view.client.html"
            })
            .when("/profile", {
                templateUrl: "./views/user/profile.view.client.html"
            })
            .when("/register", {
                templateUrl: "./views/user/register.view.client.html"
            })

            .otherwise({
                redirectTo : "/"
            });
    }
})();
