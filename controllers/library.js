// const bcrypt = require('bcrypt');
const express = require('express');
const library = express.Router();
const Funds = require('../models/funds');
const moment = require('moment');

///////////////////////////////////////////////////////////////////////////////////

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

////// Search //////
library.get('/search', (req, res) => {
	console.log(req.query.name);
	Funds.find(
		{ name: { $regex: req.query.name, $options: 'i' } },
		(err, searchedFunds) => {
			if (err) {
				console.log(err);
				res.send('<a href="/library">Invalid search value</a>');
			}
			// if (searchedFunds) res.send(searchedFunds);
			res.render('library/search.ejs', {
				funds: searchedFunds,
				currentUser: req.session.currentUser,
				moment: moment,
			});
		}
	);
});

////////////////////////// Portfolio ///////////////////////////
const shortRisk = ['Moderately Conservative', 'Balanced'];
const LongRisk = [
	'Moderately Conservative',
	'Balanced',
	'Growth',
	'Aggressive',
];
const asset = ['fixed income', 'equity'];

library.get('/portfolio', (req, res) => {
	res.render('library/portfolio.ejs', {
		currentUser: req.session.currentUser,
	});
});

////////Simulate////////
library.get('/portfolio/simulate', (req, res) => {
	// res.send(req.query.payment_type);
	const paymentHandle = [];
	let risk = '';
	let portfolio = [];
	const paymentHandler = (payment) => {
		if (typeof payment === 'string') {
			if (payment === 'cash') paymentHandle.push('Cash');
			else paymentHandle.push(payment.toUpperCase());
		} else {
			payment.forEach((element) => {
				if (element === 'cash') paymentHandle.push('Cash');
				else paymentHandle.push(element.toUpperCase());
			});
		}
		console.log(paymentHandle);
	};

	paymentHandler(req.query.payment_type);

	if (req.query.time_horizon === 'short') {
		risk = shortRisk;
	}
	if (req.query.time_horizon === 'long') {
		risk = LongRisk;
	}

	Funds.find(
		{
			riskRating: { $in: risk },
			assetClass: { $regex: asset[0], $options: 'i' },
			paymentType: { $in: paymentHandle },
		},
		(err, foundFunds) => {
			if (err) {
				console.log(err);
			}
			if (foundFunds) {
				if (req.query.risk_appetite === 'conservative') {
					for (let i = 0; i < 2; i++) {
						portfolio.push(foundFunds[i]);
					}
				}
				if (req.query.risk_appetite === 'aggressive') {
					for (let i = 0; i < 1; i++) {
						portfolio.push(foundFunds[i]);
					}
				}

				Funds.find(
					{
						riskRating: { $in: risk },
						assetClass: { $regex: asset[1], $options: 'i' },
						paymentType: { $in: paymentHandle },
					},
					(err, foundFunds) => {
						if (err) {
							console.log(err);
						}
						if (foundFunds) {
							if (req.query.risk_appetite === 'conservative') {
								for (let i = 0; i < 1; i++) {
									portfolio.push(foundFunds[i]);
								}
							}
							if (req.query.risk_appetite === 'aggressive') {
								for (let i = 0; i < 2; i++) {
									portfolio.push(foundFunds[i]);
								}
							}
							res.render('library/simulate.ejs', {
								funds: portfolio,
								currentUser: req.session.currentUser,
								moment: moment,
							});
							// res.send(portfolio);
						}
					}
				).sort({ performance5Yr: -1 });
			}
		}
	).sort({ performance5Yr: -1 });
});

////// New //////
library.get('/new', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		res.render('library/new.ejs', { currentUser: req.session.currentUser });
	}
});

////// Show //////
library.get('/:id', (req, res) => {
	Funds.findById(req.params.id, (err, foundFund) => {
		if (err) console.log(err);
		// res.send(foundFund);
		res.render('library/show.ejs', {
			fund: foundFund,
			currentUser: req.session.currentUser,
			moment: moment,
		});
	});
});

////// Create //////
library.post('/', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
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

////// Edit //////
library.get('/:id/edit', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		Funds.findById(req.params.id, (err, foundFund) => {
			if (err) console.log(err);
			res.render('library/edit.ejs', {
				fund: foundFund,
				currentUser: req.session.currentUser,
			});
		});
	}
});

////// Update //////
library.put('/:id', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		req.body.paymentType = req.body.paymentType.split(',');
		Funds.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true },
			(err, updatedFund) => {
				if (err) console.log(err);
				if (updatedFund) {
					console.log(updatedFund);
					res.redirect('/library/' + req.params.id);
				}
			}
		);
	}
});

////// Delete //////
library.delete('/:id', (req, res) => {
	if (!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		Funds.findByIdAndRemove(req.params.id, (err, removedFund) => {
			if (err) console.log(err);
			if (removedFund) {
				console.log(removedFund);
				res.redirect('/library');
			}
		});
	}
});

module.exports = library;
