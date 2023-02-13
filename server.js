// This file sets up the basic properties for our express server
const express = require('express');
const app = express();
 
// this is the port that we will be listening on
var PORT = process.env.PORT || 3000;

// this is the middleware that will allow us to parse the data from the request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// this is the routes that I will be using
require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

// console log to let us know that the server is running
app.listen(PORT, function() {
    console.log('App listening on PORT: ' + PORT);
});