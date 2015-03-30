/* App config
 * require
 * middlewares
 * app parameters */
var path = require('path');
var express = require('express');
var app = express();

// Router
var router = express.Router();
app.use(router);
// serve the templates/js/ files as static resources
// so each template js files will be available
router.use(express.static(__dirname + '/templates/js'));

// Routing
var Controller = require('./controller');

router.route('/workerData')
    .all(Controller.getWorkerData);

router.route('/worker')
    .get(Controller.getWorkerPage);

// HTTP Listening
app.listen(1337);