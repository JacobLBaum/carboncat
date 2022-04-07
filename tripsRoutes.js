require('./db.js');
const { MongoClient } = require("mongodb");

const express = require('express');
const router = express.Router();
const request = require("request");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle')
const Trip = mongoose.model('Trip')
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "CarbonCat"




router.get('/', async (req, res) => {
    try {
        await client.connect();
        console.log("Connected correctly to MongoDB-Atlas server");
        const db = client.db(dbName);
        const col = db.collection("trips");
        const trips = await client.db("CarbonCat").collection("trips").find({}).toArray()
        console.log(trips);
        res.render("trips", {trips: trips})
    } catch (err) {
        console.log(err.stack);
    } 
});

router.get('/add', (req, res) => {
    res.render('addTrip');
});

router.post('/add', async (req, res) => {
    //const gglDrctns = request('https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=YOUR_API_KEY', 
    //function(error, response, body) {//API for directions from Google maps
    //    console.log(body);
    //});    
    //info on Google Maps API here: https://developers.google.com/maps/documentation/directions/quickstart#api-key
    await client.connect();
    console.log("Connected correctly to MongoDB-Atlas server");
    const db = client.db(dbName);
    const col = db.collection("trips");
    
    const trip = new Trip({
        user: req.session.user, name: req.body.name, 
        modeOfTransportation: req.body.modeOfTransportation, distance: req.body.distance, duration: req.body.duration, 
        numTravelers: req.body.numTravelers, createdAt: new Date(Date.now()), emissions: req.body.distance*323/1000
    })

    const p = await col.insertOne(trip);
    const myDoc = await col.findOne();
    console.log(myDoc);
    res.redirect('/trips');
});

module.exports = router;
