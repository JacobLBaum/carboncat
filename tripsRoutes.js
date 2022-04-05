require('./db.js');
const { MongoClient } = require("mongodb");

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Vehicle = mongoose.model('Vehicle')
const Trip = mongoose.model('Trip')
const url = "mongodb+srv://leafweaf:<Password>@carboncat.bfufj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(url);
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
    await client.connect();
    console.log("Connected correctly to MongoDB-Atlas server");
    const db = client.db(dbName);
    const col = db.collection("trips");
    
    const trip = new Trip({
        user: req.session.user, name: req.body.name, 
        modeOfTransportation: req.body.modeOfTransportation, distance: req.body.distance, duration: req.body.duration, 
        numTravelers: req.body.numTravelers, createdAt: new Date(Date.now())
    })

    const p = await col.insertOne(trip);
    const myDoc = await col.findOne();
    console.log(myDoc);
    res.redirect('/trips');
});

module.exports = router;
