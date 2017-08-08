(function () {
    angular
        .module("JobHunter")
        .controller("AdminController", AdminController);

    function AdminController(UserService, $timeout, $window, $location, admin) {
        var vm = this;
        vm.user = admin;
        vm.logout = logout;

        vm.deleteUser = deleteUser;
        vm.addAdmin = addAdmin;
        vm.removeAdmin = removeAdmin;
        vm.createUser = createUser;

        UserService
            .findAllUsers()
            .then(function (users) {
                vm.users = users;
            });

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function deleteUser(user) {
            if (user._id === admin._id) {
                vm.error = "You cannot delete yourself!";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            } else {
                UserService
                    .deleteUser(user._id)
                    .then(function () {
                        $window.location.reload();
                    }, function () {
                        vm.error = "Unable to remove this user.";
                        $timeout(function () {
                            vm.error = null;
                        }, 3000);
                    });
            }
        }

        function addAdmin(user) {
            user.roles = ['USER', 'ADMIN'];
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    $window.location.reload();
                }, function () {
                    vm.error = "Fail when add this user as admin.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }

        function removeAdmin(user) {
            if (user._id === admin._id) {
                vm.error = "You cannot change roles of yourself!";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            } else {
                user.roles = ['USER'];
                UserService
                    .updateUser(user._id, user)
                    .then(function () {
                        $window.location.reload();
                    }, function () {
                        vm.error = "Fail when remove this user as admin.";
                        $timeout(function () {
                            vm.error = null;
                        }, 3000);
                    });
            }
        }

        function createUser(newUser) {
            if (newUser.username === null || newUser.password === null) {
                vm.error = "Username and password are required!";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            } else {
                // console.log(newUser);
                var user = {
                    username: newUser.username,
                    password: newUser.password,
                    firstName: "",
                    lastName: "",
                    email: ""
                };
                UserService
                    .createUser(user)
                    .then(function (user) {
                        // console.log("user: " + user);
                        $window.location.reload();
                    }, function () {
                        vm.error = "Fail when creating a new user.";
                        $timeout(function () {
                            vm.error = null;
                        }, 3000);
                    })
            }
        }
    }
})();