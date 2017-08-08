(function () {
    angular
        .module("JobHunter")
        .controller("JobListController", JobListController)
        .controller("NewJobController", NewJobController)
        .controller("EditJobController", EditJobController);

    function JobListController(loggedin, $location, $sce, UserService, JobService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        vm.trustThisContent = trustThisContent;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        JobService
            .findJobsByUser(vm.uid)
            .then(renderJobs);

        function renderJobs(jobs) {
            vm.jobs = jobs;
        }

        function trustThisContent(html) {
            // diligence to scrub unsafe content
            return $sce.trustAsHtml(html);
        }
    }

    function EditJobController(loggedin, $routeParams, $location, $timeout, UserService, JobService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.jid = $routeParams.jid;
        vm.logout = logout;

        vm.updateJob = updateJob;
        vm.deleteJob = deleteJob;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        JobService
            .findJobById(vm.jid)
            .then(function (job) {
                vm.job = job;
            }, function (error) {
                vm.error = "Cannot find such a job";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        function updateJob(newJob) {
            // console.log("in service: do update Job");
            JobService
                .updateJob(vm.jid, newJob)
                .then(function () {
                    vm.updated = "Job changes saved!";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });

        }

        function deleteJob(job) {
            JobService
                .deleteJob(vm.uid, job._id)
                .then(function () {
                    $location.url("/job");
                }, function (error) {
                    vm.error = "Unable to remove this job";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
    }

    function NewJobController(loggedin, $location, UserService, JobService) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        vm.createJob = createJob;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function createJob(job) {
            JobService
                .createJob(vm.uid, job)
                .then(function () {
                    $location.url('/job');
                })
        }
    }

})();