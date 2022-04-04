require('./db.js');

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle')
const Trip = mongoose.model('Trip')


router.get('/', (req, res) => {
    query = {}
    //req.session.count = req.session.count ? req.session.count + 1 : 1;
    Trip.find(query, function(err, trips, count) {
        res.render('trips', {trips: trips});
    });    
});

router.get('/add', (req, res) => {
    //req.session.count = req.session.count ? req.session.count + 1 : 1;
    res.render('addTrip');
});

router.post('/add', (req, res) => {
    new Trip({user: req.session.user, name: req.body.name, 
        modeOfTransportation: req.body.modeOfTransportation, distance: req.body.distance, duration: req.body.duration, 
        numTravelers: req.body.numTravelers, createdAt: new Date(Date.now())}).save(function(err, cat, count){
            res.redirect('/trips');
        });
});

router.get('/mine', (req, res) => {
    req.session.count = req.session.count ? req.session.count + 1 : 1;
    const query = {sessID: req.sessionID};
    Review.find(query, function(err, reviews, count) {
        res.render('mine', {reviews: reviews, count: req.session.count});
    });
});

module.exports = router;
