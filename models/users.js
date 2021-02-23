const mongoose = require('mongoose');

////create schema//////
const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

////create model/////
const User = mongoose.model('User', userSchema);

////export/////
module.exports = User;
