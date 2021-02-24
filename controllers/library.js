const bcrypt = require('bcrypt');
const express = require('express');
const library = express.Router();
const Funds = require('../models/funds');

////// Index //////
library.get('/', (req, res) => {
	Funds.find({}, (err, foundFunds) => {
		if (err) console.log(err);
		res.render('library/index.ejs', {
			allFunds: foundFunds,
			currentUser: req.session.currentUser,
		});
	});
});

////// New //////
library.get('/new', (req, res) => {
	res.render('library/new.ejs', { currentUser: req.session.currentUser });
});

////// Show //////
library.get('/:id', (req, res) => {
	Funds.findById(req.params.id, (err, foundFund) => {
		if (err) console.log(err);
		res.render('library/show.ejs', {
			fund: foundFund,
			currentUser: req.session.currentUser,
		});
	});
});

////// Create //////
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
				res.redirect('/library');
			}
		});
	}
});

module.exports = library;
