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

// Session
var session = require('express-session');
app.use(session({
    secret: 'oie4g0ad3m56x3gn956',
    saveUninitialized: true,
    resave: false
}));

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