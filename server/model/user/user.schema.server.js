module.exports = function(mongoose){
    // var websiteSchema = require("../website/website.schema.server.js")(mongoose);

    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,

        roles: [{type: String,
            default: 'USER',
            enum: ['USER', 'ADMIN']}],

        email : String,
        phone : String,
        description: String,
        jobs : [{
            type: Schema.Types.ObjectId,
            ref : 'jobModel'
        }],
        courses : [{
            type: Schema.Types.ObjectId,
            ref : 'courseModel'
        }],
        // friends : [{
        //     type: Schema.Types.ObjectId,
        //     ref : 'userModel'
        // }],
        location : String,
        job: String,
        salary: Number,
        dateCreated : {
            type : Date,
            default: Date.now
        },
        // facebook: {
        //     id:    String,
        //     token: String
        // }
        google: {
            id: String,
            token: String
        }
    }, {collection: 'user'});

    return userSchema;
};