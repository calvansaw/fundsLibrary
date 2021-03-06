const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/users');

users.get('/new', (req, res) => {
	res.render('users/new.ejs', { currentUser: req.session.currentUser });
});

users.post('/', (req, res) => {
	req.body.password = bcrypt.hashSync(
		req.body.password,
		bcrypt.genSaltSync(10)
	);
	User.create(req.body, (err, createdUser) => {
		if (err) console.log(err);
		if (createdUser) {
			console.log(createdUser);
			res.redirect('/library');
		}
	});
});

module.exports = users;
