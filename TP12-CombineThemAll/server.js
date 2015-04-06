/**
 * Created by baptiste on 2015-03-31.
 */

// The colors module is used here to add colors to the logs in the server console ;)
var colors = require('colors');

console.log('      Starting MEAN stack... :)      '.black.bgGreen);
console.log(' Node.js -> '.black.bgGreen+' running'.green);


// EXPRESS /////////////
// Require and create an instance of the Express framework
var express = require('express');
var app = express();


// BODY-PARSER /////////////
// To parse body JSON data
var bodyParser = require('body-parser');
app.use(bodyParser.json());


// MONGODB /////////////
// Mongoose connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customers');
var db = mongoose.connection;

// MongoDB/Mongoose logs
db.on('error', function() { console.log(' MongoDB -> '.black.bgRed+' connection error to customers@localhost'.red); });
db.once('open', function() { console.log(' MongoDB -> '.black.bgGreen+' connected to customers@localhost'.green); });


// MORGAN /////////////
// Using the file system module
// Create a write stream to log the requests into a file with morgan
// You could also use morgan to log the requests into the console or anywhere else you want..
var fs = require('fs'),
    morgan = require('morgan');
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', {flags: 'a'});
// Setup the logger with the 'combined' format (see the morgan doc for other output styles : https://github.com/expressjs/morgan#morgan)
// Pass an option object to the logger specifying the stream to use to output logs
app.use(morgan('combined', {stream: accessLogStream}));


// ROUTER /////////////
var router = express.Router();
app.use(router);

// The public/ folder contains our front-end libraries (like Angular, jQuery, ...)
// and also contains the Angular app itself (app.js, controllers.js, ...)
// Using this, our server will be able to serve those files declared in the HTML in the <script> tags
router.use(express.static(__dirname + '/app/public'));


// ROUTING /////////////
var Controller = require('./controller');

router.route(['/', '/index'])
    // Get the Angular application
    .get(Controller.getAngularApp);

// The Angular application will communicate with all the following URLs
// Note that you can also use those URLs directly with your browser to see what they return
router.route('/customers')
    // Get all the customers
    .get(Controller.getAllCustomers);

router.route('/customer')
    // Add a customer
    .post(Controller.addCustomer);

// The `:id` is a variable, and its value will be available in the request object given to the controllers
router.route('/customer/:id')
    // Get a customer
    .get(Controller.getCustomer)
    // Update a customer
    .put(Controller.updateCustomer)
    // Delete a customer
    .delete(Controller.deleteCustomer);


// HTTP LISTENING /////////////
var port = 1337;
app.listen(port, function() {
    console.log(' Express -> '.black.bgGreen+(' listening on *:'+port).green);
});