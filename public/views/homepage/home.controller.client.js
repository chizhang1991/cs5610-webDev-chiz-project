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


        // chart
        google.charts.load('current', {'packages':['corechart']});
        google.charts.setOnLoadCallback(drawChart);

        UserService
            .getTrend(vm.user)
            .then(function (trend) {
                vm.trend = JSON.parse(trend).default.timelineData;
                vm.table = [];
                vm.table.push(["Year", "Value"]);
                for (i = 0; i < vm.trend.length; i++) {
                    vm.table.push([String(vm.trend[i].formattedTime), parseInt(vm.trend[i].value)]);
                }

            })
            .then(function () {
                console.log("go to then");
            });

        vm.takethis = [
            ['Year', 'Sales', 'Expenses'],
            ['2004',  1000,      400],
            ['2005',  1170,      460],
            ['2006',  660,       1120],
            ['2007',  1030,      540]
        ];

        function drawChart() {
            // var data = google.visualization.arrayToDataTable([
            //     ['Year', 'Sales', 'Expenses'],
            //     ['2004',  1000,      400],
            //     ['2005',  1170,      460],
            //     ['2006',  660,       1120],
            //     ['2007',  1030,      540]
            // ]);

            var data = google.visualization.arrayToDataTable(vm.takethis);

            var options = {
                title: vm.user.job,
                curveType: 'function',
                legend: { position: 'bottom' }
            };

            var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

            chart.draw(data, options);
        }


        // var ctx = document.getElementById("myChart");
        // vm.myChart = new Chart(ctx, {
        //     type: 'bar',
        //     data: {
        //         labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25","26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40","41", "42", "43", "44", "45", "46", "47", "48", "49", "50","51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99"],
        //         datasets: [{
        //             label: vm.user.job,
        //             data: [59, 66, 76, 71, 71, 74, 72, 68, 67, 75, 71, 69, 66, 70, 70, 68, 77, 80, 72, 70, 75, 76, 75, 72, 69, 73, 76, 76, 85, 78, 67, 71, 75, 78, 74, 67, 73, 78, 78, 75, 74, 79, 87, 85, 84, 79, 78, 81, 80, 72],
        //             backgroundColor: 'rgba(54, 162, 235, 0.2)'
        //         }]
        //     },
        //     options: {
        //         scales: {
        //             yAxes: [{
        //                 ticks: {
        //                     beginAtZero:true
        //                 }
        //             }]
        //         }
        //     }
        // });

    }
})();