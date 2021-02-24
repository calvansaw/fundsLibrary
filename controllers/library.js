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
	if(!req.session.currentUser) {
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
	if(!req.session.currentUser) {
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
library.put('/:id', (req, res)=>{
	if(!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		req.body.paymentType = req.body.paymentType.split(',');
		Funds.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedFund)=>{
			if(err) console.log(err);
			if(updatedFund) {
				console.log(updatedFund);
				res.redirect('/library/' + req.params.id);
			}
		})
	}
})

////// Delete //////
library.delete('/:id', (req, res)=>{
	if(!req.session.currentUser) {
		console.log('not authenticated redirecting...');
		res.redirect('/library');
	} else {
		Funds.findByIdAndRemove(req.params.id, (err, removedFund)=>{
			if(err) console.log(err);
			if(removedFund) {
				console.log(removedFund);
				res.redirect('/library');
			}
		})
	}
})



module.exports = library;
