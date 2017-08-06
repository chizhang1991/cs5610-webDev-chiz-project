module.exports = function(mongoose, userModel) {
    var jobSchema = require('./job.schema.server')(mongoose);
    var jobModel = mongoose.model('jobModel', jobSchema);

    /* var api = {
     'createWebsiteForUser': createWebsiteForUser,
     'findAllWebsitesForUser': findAllWebsitesForUser,
     'findWebsiteById': findWebsiteById,
     'updateWebsite': updateWebsite,
     'removePageFromWebsite': removePageFromWebsite,
     'deleteWebsite': deleteWebsite
     };
     return api;*/
}