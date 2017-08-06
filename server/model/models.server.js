module.exports = function(mongoose) {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://cs5610-project:project@ds135963.mlab.com:35963/heroku_bfx8m8ts';
    }
    else
    {
        connectionString = 'mongodb://localhost:27017/cs5610-project'
    }

    mongoose.connect(connectionString, {
        useMongoClient: true
    });
    mongoose.Promise = require('q').Promise;

    var userModel = require("./user/user.model.server.js")(mongoose);
    // var courseModel = require("./courses/course.model.server")(mongoose, userModel);
    // var jobModel =  require("./jobs/job.model.server")(mongoose, userModel);

    var models = {
        'userModel' : userModel,
        // 'courseModel' : courseModel,
        // 'jobModel' : jobModel
    };

    return models;
};

console.log("models.server.js is running");