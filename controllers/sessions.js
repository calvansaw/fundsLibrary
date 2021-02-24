const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users');

sessions.get('/', (req, res) => {
	res.render('sessions/new.ejs');
});

sessions.post('/', (req, res) => {
	User.findOne({ username: req.body.username }, (err, foundUser) => {
		console.log(req.body);
		if (!foundUser) {
			console.log('cannot find user', req.body.username);
			res.redirect('/sessions');
		} else {
			if (bcrypt.compareSync(req.body.password, foundUser.password)) {
				req.session.currentUser = foundUser;
				console.log('successful login');
				res.redirect('/');
			} else res.send('<a href="/sessions">Wrong password</a>');
		}
	});
});

module.exports = sessions;
