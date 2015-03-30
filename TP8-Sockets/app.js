/* App config
 * require
 * middlewares
 * app parameters */
var path = require('path');
var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// Router
var router = express.Router();
app.use(router);
// serve the templates/js/ files as static resources
// so each template js files will be available
router.use(express.static(__dirname + '/templates/js'));

// Routing
var Controller = require('./controller');

router.route('/')
    .all(Controller.getChatPage);


// HTTP Listening
http.listen(1337, function(){
    console.log('listening on *:1337');
});

io.on('connection', function(socket){

    var user;

    socket.on('new user', function(pseudo) {

        console.log(pseudo + ' is connected');
        user = pseudo;
    });

    socket.on('chat message', function(msg) {
        console.log('the message has bee sent to the server : ', msg);
        io.emit('new chat message', user + ' : ' + msg);
    });
});
