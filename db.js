const { Int32 } = require('mongodb');
const mongoose = require('mongoose'),
URLSlugs = require('mongoose-url-slugs'),
passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
	username: {type: String, required: true},
	hash: {type: String, required: true},	//user's password hashed
 	trips:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trip' }],	//list of user's trips
  	vehicles:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }]	//list of user's vehicles
});

const VehicleSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
	name: {type: String, required: true},	//name of vehicle
	company: {type: String, required: true},	//name of maker of vehicle
	model: {type: String, required: true},		//model of vehicle
	year: {type: Number, min: 1900, required: false},	//year vehicle was made
	MPG: {type: Number, min: 1, required: true},	//miles per gallon of vehicle
	electric: {type: Boolean, default: false, required: false},	//whether the vehicle is electric or not
	hybrid: {type: Boolean, default: false, required: false},
	notes: 	{type: String, required: false}
}, {
	_id: true
});


const TripSchema = new mongoose.Schema({
  	user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  	name: {type: String, required: false},
	modeOfTransportation: {type: String, required: true},
	distance: {type: Number, min: 0, required: true},
	duration: {type: Number, min: 0, required: true},
	numTravelers: {type: Number, min: 1, required: true},
	createdAt: {type: Date, required: true},
	emissions: {type: Number, required: true}
});


UserSchema.plugin(passportLocalMongoose);
TripSchema.plugin(URLSlugs('name'));

mongoose.model('User', UserSchema);
mongoose.model('Vehicle', VehicleSchema);
mongoose.model('Trip', TripSchema);

const mongooseOpts = {
	useNewUrlParser: true,  
	useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost/aitFinal', mongooseOpts, (err) => {
	if (err) {
	  console.log(err);
	} else {
	  console.log('connected to database'); 
	}
});

//module.exports = mongoose.model('User', UserSchema);
