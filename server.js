if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

const app = express();
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('combined'));
// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, 'client/build')));
app.use(express.static(path.join(__dirname, 'client/public')));

require('./routes/api/movies/movieRoutes')(app);
require('./routes/api/movies/apiRoutes')(app);
require('./routes/api/movies/userRoutes')(app);
require('./routes/api/movies/imageRoute')(app);

// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/public/index.html'));
});

const today = new Date();
const date = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
const dateTime = `${date} ${time}`;

const port = process.env.PORT || process.argv[2] || 8080;
app.listen(port, () => {
	console.log(`Listening on ${port} @ ${dateTime}`);
});
