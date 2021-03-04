require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const methodOverride = require('method-override');
// const bcrypt = require('bcrypt');
const session = require('express-session');
const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/fund';

/////////////// connect to mongoose /////////////
mongoose.connect(mongoURI, {
	useNewUrlParser: true,
});
mongoose.connection.once('open', () => {
	console.log('connected to mongo');
});

////////////////// middleware ///////////////////
// for put delete routes
app.use(methodOverride('_method'));
// body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// static files
app.use(express.static('public'));
// session
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

////////////////// controllers ///////////////////
app.get('/', (req, res) => {
	res.send('Hello World fundsLibrary');
});

////// create new user ///////
const userController = require('./controllers/users');
app.use('/users', userController);

////// sessions-login ///////
const sessionController = require('./controllers/sessions');
app.use('/sessions', sessionController);

////// fund library ///////
const libraryController = require('./controllers/library');
app.use('/library', libraryController);

//////////////////////////////////////////////////
app.listen(port, () => {
	console.log('Listening at port', port + ' ' + mongoURI);
});
