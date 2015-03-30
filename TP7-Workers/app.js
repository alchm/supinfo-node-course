/* App config
 * require
 * middlewares
 * app parameters */
var express = require('express');
var app = express();

var path = require('path');

// To parse form data
// urlencoded -> form data format
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tp6');
var db = mongoose.connection;
db.on('error', function() { console.log('connection error') });
db.once('open', function () { console.log('Connected to MongoDB') });

app.use(function(req, res, next) {
    req.db = db;
    next();
});


// Templating
app.set('view engine', 'jade');
app.set('views', path.join(__dirname + '/templates'));

// Router
var router = express.Router();
app.use(router);
// serve the templates/js/ files as static resources
// so each template js files will be available
router.use(express.static(__dirname + '/templates/js'));

// Routing
var Controller = require('./controller');

router.route('*')
    .all(Controller.allInit);

router.route('/auth/*')
    .all(Controller.allAuth);

router.route(['/','/index'])
    .get(Controller.getIndex);

router.route('/form')
    .get(Controller.getForm)
    .post(Controller.postForm);

router.route('/delete/:id')
    .get(Controller.deleteSessionRecord);

// HTTP Listening
app.listen(1337);