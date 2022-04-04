require('./db.js');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const myRouter = require('./tripsRoutes.js');
const passport = require('passport');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle')
const Trip = mongoose.model('Trip')
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// enable sessions
const sessionOptions = {
    secret: 'AteRRiBLesEcREtNeVErtObEGUeSsed',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/trips', myRouter);

app.get('/', (req, res, next) => {
  res.render('home', {})
  req.session.user = new User({username: 'default', hash: 'hashedPword', trips: [], vehicles: []})
});

app.get('/stats', (req, res, next) => {
  res.render('stats', {})
});

app.get('/addVehicle', (req, res, next) => {
  res.render('addVehicle', {})
});

app.get('/summary', (req, res, next) => {
  res.render('summary', {})
});

app.listen(process.env.PORT || 3000);
