var passport = require('passport'),
    mongoose = require('mongoose');

var repoSchema = mongoose.Schema({
  	name: { type: String, required: true},
  	path: { type: String, required: true},
 	createdAt: { type: Date, required: true},
 	updatedAt: { type: Date, required: true},
 	userId: { type: mongoose.Schema.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Repo', repoSchema);