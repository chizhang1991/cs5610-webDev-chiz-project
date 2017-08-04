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
    // var websiteModel = require("./website/website.models.server.js")(mongoose, userModel);
    // var pageModel =  require("./page/page.models.server.js")(mongoose, websiteModel);
    // var widgetModel = require("./widget/widget.models.server.js")(mongoose, pageModel);

    var models = {
        'userModel' : userModel
        // 'websiteModel' : websiteModel,
        // 'pageModel' : pageModel,
        // 'widgetModel' : widgetModel
    };

    return models;
};

console.log("models.server.js is running");