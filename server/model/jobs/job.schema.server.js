module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var jobSchema = new Schema({
        _user : {type : Schema.Types.ObjectId, ref : 'User'},
        name : {type : String, required : true},
        description : String,
        // pages : [{
        //     type : Schema.Types.ObjectId,
        //     ref : 'Page'
        // }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'job'});

    return jobSchema;
};