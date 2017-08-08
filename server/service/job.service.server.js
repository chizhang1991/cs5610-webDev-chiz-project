module.exports = function(app, models){


    var model = models.jobModel;

    //POST Calls
    app.post('/api/user/:uid/job',createJob);

    //GET Calls
    app.get('/api/user/:uid/job',findAllJobsForUser);
    app.get('/api/job/:jid',findJobById);

    //PUT Calls
    app.put('/api/job/:jid',updateJob);

    //DELETE Calls
    app.delete('/api/user/:uid/job/:jid',deleteJob);


    /*API calls implementation*/
    function createJob(req, res) {
        var uid = req.params.uid;
        var job = req.body;


        model
            .createJobForUser(uid, job)
            .then(
                function (job) {
                    if(job){
                        // console.log("in if branch");
                        res.json(job);
                        // res.send(200);
                    } else {
                        // console.log("in else branch");
                        job = null;
                        res.send(job);
                    }
                }
                ,
                function (error) {
                    // console.log("in error branch");
                    res.sendStatus(400).send("job service server, createJobForUser error");
                }
            )

    }

    function findAllJobsForUser(req, res) {
        console.log("find all jobs for user into service");
        var uid = req.params.uid;
        // console.log("in service: " + uid);

        model
            .findAllJobsForUser(uid)
            .then(
                function (jobs) {
                    console.log("service: jobs" + jobs);
                    if(jobs) {
                        res.json(jobs);
                    } else {
                        jobs = null;
                        res.send(jobs);
                    }
                },
                function (error) {
                    console.log("error");
                    res.sendStatus(400).send("job service server, findAllJobsForUser error");
                }
            )

    }

    function findJobById(req, res) {
        var jid = req.params.jid;

        model
            .findJobById(jid)
            .then(
                function (job) {
                    if(job) {
                        res.json(job);
                    } else {
                        job = null;
                        res.send(job);
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )


    }

    function updateJob(req, res) {

        var jid = req.params.jid;
        var job = req.body;

        model
            .updateJob(jid, job)
            .then(
                function (job){
                    res.json(job)
                },
                function (error){
                    res.sendStatus(400).send("job service server, updateJob error");
                }
            );

    }

    function deleteJob(req, res) {
        var uid = req.params.uid;
        var jid = req.params.jid;

        if(jid){
            model
                .deleteJob(uid, jid)
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