module.exports = function(mongoose, userModel) {
    var jobSchema = require('./job.schema.server')(mongoose);
    var jobModel = mongoose.model('jobModel', jobSchema);

    var api = {
        'createJobForUser': createJobForUser,
        'findAllJobsForUser': findAllJobsForUser,
        'findJobById': findJobById,
        'updateJob': updateJob,
        'deleteJob': deleteJob,
        'findAllJobs' : findAllJobs
    };

    return api;

    function createJobForUser(userId, job) {
        job._user = userId;
        return jobModel
            .create(job)
            .then(
                function (job) {
                    return userModel
                        .addJobForUser(userId, job._id)
                });
    }

    function findAllJobsForUser(userId) {
        return jobModel
            .find({_user: userId})
            .populate('_user')
            .exec();
    }

    function findJobById(jobId) {
        return jobModel.findOne({_id: jobId});
    }

    function updateJob(jobId, job) {
        return jobModel.update({
            _id : jobId
        }, {
            description: job.description,
            url: job.url,
            title: job.title,
            company: job.company,
            location: job.location
        });
    }


    function deleteJob(userId, jobId) {
        return jobModel
            .remove({_id: jobId})
            .then(
                function (status) {
                    return userModel
                        .removeJobFromUser(userId, jobId);
                }
            );
    }

    function findAllJobs() {
        return jobModel.find();
    }
};