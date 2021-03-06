(function () {
    angular
        .module("JobHunter")
        .factory('UserService', UserService);

    function UserService($http) {
        var services = {
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "findAllUsers": findAllUsers,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "setCurrentUser":setCurrentUser,
            "login":login,
            "logout" : logout,
            "register" : register,
            "createUser" : createUser,
            "getTrend" : getTrend
            // "addAdmin" : addAdmin
        };
        return services;

        // security

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            };
            return $http.post(url, credentials)
                .then(function (response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "api/logout";
            return $http.post(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function register(user) {
            var url = "api/register";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function createUser(user) {
            var url = "api/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                })
        }

        function setCurrentUser(user) {
            $rootScope.currentUser = user;
        }


        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username=" + username + "&password=" + password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllUsers() {
            var url = '/api/alluser';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function updateUser(userId, user) {
            var url = "/api/user/" + userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function getTrend(user) {
            var url = "/api/trend/" + user._id;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

    }
})();