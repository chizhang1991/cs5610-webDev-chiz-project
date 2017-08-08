module.exports = function(mongoose){

    var Schema = mongoose.Schema;

    var jobSchema = new Schema({
        _user : {type : Schema.Types.ObjectId, ref : 'User'},
        company : {type : String, required : true},
        description : String,
        url: String,
        title: String,
        location: String,
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection : 'job'});

    return jobSchema;
};