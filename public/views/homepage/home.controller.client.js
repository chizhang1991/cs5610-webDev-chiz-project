(function () {
    angular
        .module("JobHunter")
        .controller("HomeController", HomeController);

    function HomeController(loggedin, UserService, CourseService, JobService, $location, $sce) {
        var vm = this;
        vm.uid = loggedin._id;
        vm.user = loggedin;
        vm.logout = logout;
        vm.trustThisContent = trustThisContent;

        vm.aboutMyself = loggedin.description;

        function logout() {
            UserService
                .logout()
                .then(function () {
                    $location.url('/login');
                })
        }

        function trustThisContent(html) {
            // diligence to scrub unsafe content
            return $sce.trustAsHtml(html);
        }

        CourseService
            .findCoursesByUser(vm.uid)
            .then(function (courses) {
                vm.courses = courses;
            });

        JobService
            .findJobsByUser(vm.uid)
            .then(function (jobs) {
                vm.jobs = jobs;
            });


        // draw chart, using google trends json
        UserService
            .getTrend(vm.user)
            .then(function (trend) {
                vm.trend = trend;
            })
            .then(function () {
                vm.trendParser = JSON.parse(vm.trend).default.timelineData;
                vm.table = [];
                vm.table.push(["Year", "Value"]);
                for (i = 0; i < vm.trendParser.length; i++) {
                    vm.table.push([String(vm.trendParser[i].formattedTime), parseInt(vm.trendParser[i].value)]);
                }
            })
            .then(function () {

                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {

                    var data = google.visualization.arrayToDataTable(vm.table);

                    var options = {
                        title: vm.user.job,
                        curveType: 'function',
                        legend: { position: 'bottom' }
                    };

                    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

                    chart.draw(data, options);
                }
            });

    }
})();