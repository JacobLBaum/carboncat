require('./db');

const passport = require('passport');
const express = require('express');
const path = require('path');

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'AteRRiBLesEcREtNeVErtObEGUeSsed',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  //empty for now
});

app.listen(3000);
