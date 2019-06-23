/**** External libraries ****/
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

/**** Configuration ****/
const appName = "Foobar";
const port = (process.env.PORT || 8080);
const app = express();
mongoose.connect(process.env.MONGO_DB);
console.log(process.env.MONGO_DB);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
app.use(bodyParser.json()); // Parse JSON from the request body
app.use(morgan('combined')); // Log all requests to the console
app.use(express.static(path.join(__dirname, '../build')));


const categorySchema = new mongoose.Schema({
	name: String,
});
const areaSchema = new mongoose.Schema({
	name: String,
});
const corpSchema = new mongoose.Schema({
	name: String,
	hash: String,
	email: String,
	phone: String
})
const jobSchema = new mongoose.Schema({
	name: String,
	description: String,
	area: {type: mongoose.Schema.Types.ObjectId, ref: 'Area'},
	category: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'},
	corp: {type: mongoose.Schema.Types.ObjectId, ref: 'Corp'}
})


let Category = mongoose.model('Category', categorySchema);
let Area = mongoose.model('Area', areaSchema);
let Corp = mongoose.model('Corp', corpSchema);
let Job = mongoose.model('Job', jobSchema);





// Additional headers for the response to avoid trigger CORS security
// errors in the browser
// Read more here: https://en.wikipedia.org/wiki/Cross-origin_resource_sharing
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");

	// intercepts OPTIONS method
	if ('OPTIONS' === req.method) {
		// respond with 200
		console.log("Allowing OPTIONS");
		res.sendStatus(200);
	}
	else {
		// move on
		next();
	}
});

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({ error: err.message });
    }
});



/**** Routes ****/



let corpsRouter = require('./corps_router')(Corp)
app.use('/api/corporations', corpsRouter)

let jobsRouter = require('./jobs_router')(Job, Category, Area, Corp)
app.use('/api/', jobsRouter)





/**** Reroute all unknown requests to the React index.html ****/
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'));
});

/**** Start! ****/
app.listen(port, () => console.log(`${appName} API running on port ${port}!`));




