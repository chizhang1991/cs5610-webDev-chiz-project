module.exports = function(app, models){


    var model = models.courseModel;

    //POST Calls
    app.post('/api/user/:uid/course',createCourse);

    //GET Calls
    app.get('/api/user/:uid/course',findAllCoursesForUser);
    app.get('/api/course/:cid',findCourseById);

    //PUT Calls
    app.put('/api/course/:cid',updateCourse);

    //DELETE Calls
    app.delete('/api/user/:uid/course/:cid',deleteCourse);

    // google trends
    app.get('/api/trend/:cid', getTrend);

    const googleTrends = require('google-trends-api');
    // googleTrends.interestOverTime({keyword: "Java"})
    //     .then(function(results){
    //         console.log('These results are awesome', results);
    //     })
    //     .catch(function(err){
    //         console.error('Oh no there was an error', err);
    //     });
    // googleTrends.interestOverTime({keyword: "Java"}, function(err, results){
    //     if(err) console.error('there was an error!', err);
    //     else console.log('my sweet sweet results', results);
    // });

    function getTrend(req, res) {
        var cid = req.params.cid;
        model
            .findCourseById(cid)
            .then(
                function (course) {
                    if(course) {
                        console.log("course in service: " + course._id);
                        var keyword = course.keyword;
                        googleTrends.interestOverTime({keyword: keyword})
                            .then(function(results){
                                console.log('These results are awesome', results);
                                res.json(results);
                            })
                            .catch(function(err){
                                console.error('Oh no there was an error', err);
                            });

                    } else {
                        course = null;
                        res.send(course);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );


        // var keyword = course.keyword;
        //
        // googleTrends.interestOverTime({keyword: keyword})
        //     .then(function(results){
        //         console.log('These results are awesome', results);
        //         res.json(results);
        //     })
        //     .catch(function(err){
        //         console.error('Oh no there was an error', err);
        //     });
        // googleTrends.interestOverTime({keyword: keyword},
        //     function(err, results){
        //     if(err) console.error('there was an error!', err);
        //     else console.log('my sweet sweet results', results);
        // });
    }

    /*API calls implementation*/
    function createCourse(req, res) {
        var uid = req.params.uid;
        var course = req.body;


        model
            .createCourseForUser(uid, course)
            .then(
                function (course) {
                    if(course){
                        // console.log("in if branch");
                        res.json(course);
                        // res.send(200);
                    } else {
                        // console.log("in else branch");
                        course = null;
                        res.send(course);
                    }
                }
                ,
                function (error) {
                    // console.log("in error branch");
                    res.sendStatus(400).send("course service server, createCourseForUser error");
                }
            )

    }

    function findAllCoursesForUser(req, res) {
        var uid = req.params.uid;
        // console.log("in service: " + uid);

        model
            .findAllCoursesForUser(uid)
            .then(
                function (courses) {
                    if(courses) {
                        res.json(courses);
                    } else {
                        courses = null;
                        res.send(courses);
                    }
                },
                function (error) {
                    res.sendStatus(400).send("course service server, findAllCoursesForUser error");
                }
            )

    }

    function findCourseById(req, res) {
        var cid = req.params.cid;

        model
            .findCourseById(cid)
            .then(
                function (course) {
                    if(course) {
                        res.json(course);
                    } else {
                        course = null;
                        res.send(course);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )


    }

    function updateCourse(req, res) {

        var cid = req.params.cid;
        var course = req.body;

        model
            .updateCourse(cid, course)
            .then(
                function (course){
                    res.json(course)
                },
                function (error){
                    res.sendStatus(400).send("course service server, updateCourse error");
                }
            );

    }

    function deleteCourse(req, res) {
        var uid = req.params.uid;
        var cid = req.params.cid;

        if(cid){
            model
                .deleteCourse(uid, cid)
                .then(
                    function (status){
                        res.sendStatus(200);
                    },
                    function (error){
                        res.sendStatus(400).send(error);
                    }
                );
        } else{
            // Precondition Failed. Precondition is that the user exists.
            res.sendStatus(412);
        }

    }
};