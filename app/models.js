var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;


exports.Users = mongoose.model('Users', new Schema({
    
    email:  String,
    name:  String,
    profile: Object,
    date_created: {type: Date, default: Date.now},
    id:  Schema.ObjectId
}));

exports.Posts = mongoose.model('Posts', new Schema({
    
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anon'},
    text: String,
    id: Schema.ObjectId
}));
