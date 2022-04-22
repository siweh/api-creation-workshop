//? add code in here to create an API with ExpressJS
const express = require('express');
// import the dataset to be used here
//!This is a list of garments that we will be using as data for our API.
const garments = require('./garments.json');
const app = express();

//TODO enable the req.body object - to allow us to use HTML forms
//TODO when doing post requests
//TODO put this before you declare any routes

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//?Enabling the static folder
app.use(express.static('public'));

//TODO please check this todo
//?Import the port number to be used here
const PORT = process.env.PORT || 4017;

app.get('/api/garments', function(req, res){

	const gender = req.query.gender;
	const season = req.query.season;

	const filteredGarments = garments.filter(garment => {
		// if both gender & season was supplied
		if (gender != 'All' && season != 'All') {
			return garment.gender === gender 
				&& garment.season === season;
		} else if(gender != 'All') { 
            // if gender was supplied
			return garment.gender === gender
		} else if(season != 'All') { 
            // if season was supplied
			return garment.season === season
		}
		return true;
	});

	// note that this route just send JSON data to the browser
	// there is no template
	res.json({ 
		garments : filteredGarments
	});
});

app.get('/api/garments/price/:price', function(req, res){
	const maxPrice = Number(req.params.price);
	const filteredGarments = garments.filter( garment => {
		// filter only if the maxPrice is bigger than maxPrice
		if (maxPrice > 0) {
			return garment.price <= maxPrice;
		}
		return true;
	});

	res.json({ 
		garments : filteredGarments
	});
});

app.post('/api/garments', (req, res) => {

	// get the fields send in from req.body
	const {
		description,
		img,
		gender,
		season,
		price
	} = req.body;

	
	
	let findDuplicates = garments.find(garment => {
		return garment.img === img;
	});
	//console.log(toFindDuplicates(garments));
	// add some validation to see if all the fields are there.
	// only 3 fields are made mandatory here
	// you can change that
	//console.log(garments.find(img));
	if (!description || !img || !price || !season || !gender) {
		res.json({
			status: 'error',
			message: 'Please fill all required fields.',
		});
	}else if (findDuplicates){
		// you can check for duplicates here using garments
		//return results;
		res.json({
			status: 'error',
			message: 'Garment already exists.',
		});
	}else {
		
		// add a new entry into the garments list
		garments.push({
			description,
			img,
			gender,
			season,
			price
		});

		res.json({
			status: 'success',
			message: 'New garment added.',
		});
		
	}
});

app.listen(PORT, function(){
    console.log(`App started on port ${PORT}`)
});