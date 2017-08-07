module.exports = function(mongoose){
    // var pageSchema = require("../page/page.schema.server")(mongoose);

    var Schema = mongoose.Schema;

    var courseSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        name: String,
        number: String,
        description: String,
        keyword: String,
        // pages : [{
        //     type: Schema.Types.ObjectId,
        //     ref : 'pageModel'
        // }],
        assignment: String,
        project: String,

        dateCreated: {type: Date, default: Date.now}
    }, {collection: 'course'});

    return courseSchema;
};