(function () {
    angular
        .module("JobHunter")
        .factory('JobService', JobService);

    function JobService($http) {

        var services = {
            'createJob': createJob,
            'findJobsByUser': findJobsByUser,
            'findJobById': findJobById,
            'updateJob': updateJob,
            'deleteJob': deleteJob
            // 'deleteJobsByUser': deleteJobsByUser
        };
        return services;

        function createJob(userId, job) {
            // console.log("find service function")
            var url = "/api/user/" + userId + "/job";
            return $http.post(url, job)
                .then(
                    function (response) {
                        return response.data;
                    }
                );
        }

        function findJobsByUser(userId) {
            console.log("in service");
            var url = "/api/user/" + userId + "/job";
            return $http.get(url)
                .then(
                    function (response) {
                        return response.data;
                    });
        }

        function findJobById(jobId) {
            var url = "/api/job/" + jobId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateJob(jobId, job) {
            console.log("do update job");
            var url = "/api/job/" + jobId;
            return $http.put(url, job)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteJob(userId, jobId) {
            var url = "/api/user/" + userId + "/job/" + jobId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();