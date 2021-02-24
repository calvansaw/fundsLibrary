const bcrypt = require('bcrypt');
const express = require('express');
const library = express.Router();
const Funds = require('../models/funds');

library.get('/new', (req, res) => {
	res.render('library/new.ejs');
});

library.post('/', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library/new');
	} else {
		req.body.paymentType = req.body.paymentType.split(',');
		Funds.create(req.body, (err, createdFund) => {
			if (err) console.log(err);
			if (createdFund) {
				console.log(createdFund);
				res.redirect('/');
			}
		});
	}
});

module.exports = library;
