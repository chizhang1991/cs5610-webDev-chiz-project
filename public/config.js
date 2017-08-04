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
                templateUrl: "./views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/profile", {
                templateUrl: "./views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when("/register", {
                templateUrl: "./views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo : "/"
            });

    }

    // security
    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user !== '0') {
                    deferred.resolve(user);
                } else {
                    deferred.reject();
                    $location.url('/login');
                }
            });
        return deferred.promise;
    };

    var checkCurrentUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                var user = response.data;
                if (user === '0') {
                    user = null;
                }
                deferred.resolve(user);

            });
        return deferred.promise;
    };

    var checkAdmin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http
            .get('/api/loggedin')
            .then(function(response) {
                // console.log(user.data);
                var user = response.data;
                if (user !== '0') {
                    if (user.roles.indexOf('ADMIN') > -1) {
                        deferred.resolve(user);
                    }
                } else {
                    $location.url('/home');
                }

            });
        return deferred.promise;
    };
})();
