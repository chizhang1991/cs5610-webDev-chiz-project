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
            .when("/register", {
                templateUrl: "./views/user/register.view.client.html",
                controller: "RegisterController",
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
            .when('/job', {
                templateUrl : "views/jobs/job-list.view.client.html",
                controller: "JobListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/job/new', {
                templateUrl : "views/jobs/job-new.view.client.html",
                controller: "NewJobController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/job/:jid', {
                templateUrl : "views/jobs/job-edit.view.client.html",
                controller: "EditJobController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/course', {
                templateUrl : "views/courses/course-list.view.client.html",
                controller: "CourseListController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/course/new', {
                templateUrl : "views/courses/course-new.view.client.html",
                controller: "NewCourseController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
            })
            .when('/course/:wid', {
                templateUrl : "views/courses/course-edit.view.client.html",
                controller: "EditCourseController",
                controllerAs: "model",
                resolve: {
                    loggedin: checkLoggedin
                }
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
