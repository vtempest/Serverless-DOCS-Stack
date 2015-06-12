var mongoose = require('mongoose'), 
	Schema = mongoose.Schema, ObjectId = Schema.ObjectId;


var threadSchema = new Schema({
    title:  String,
    postdate: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'}
});


// The Post model

var postSchema = new Schema({
    thread: ObjectId,
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'},
    post: String
});


exports.Thread = mongoose.model('Thread', threadSchema);
exports.Post = mongoose.model('Post', postSchema);
