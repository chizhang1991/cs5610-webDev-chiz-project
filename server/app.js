module.exports = function(app){

    var mongoose = require('mongoose');

    var models = require("./model/models.server.js")(mongoose);

    require("./service/user.service.server.js")(app, models);
    // require("./service/job.service.server.js")(app, models);
    require("./service/course.service.server.js")(app, models);
};

console.log("server side app.js is running");