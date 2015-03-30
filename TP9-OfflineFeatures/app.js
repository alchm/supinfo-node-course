var path = require('path');
var express = require('express');
var app = express();

// Wrap the Socket IO lib in a new server
// Express is still available
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Router
var router = express.Router();
app.use(router);
// serve the templates/ files as static resources
// so each template js files will be available
router.use(express.static(__dirname + '/templates'));

// Routing
var Controller = require('./controller');

router.route("/manifest.appcache", function(req, res){
    res.header("Content-Type", "text/cache-manifest");
    res.sendFile('./templates/manifest.appcache');
});

router.route('/')
    .all(Controller.getChatPage);

// HTTP Listening
http.listen(1337, function(){
    console.log('listening on *:1337');
});

// Socket IO
io.on('connection', function(socket){

    var user;

    // Listening the 'new user' event from the client
    socket.on('new user', function(pseudo) {
        console.log(pseudo + ' is connected');
        user = pseudo;
    });

    // Listening the 'chat message' event from the client
    socket.on('chat message', function(msg) {
        console.log('the message has been sent to the server : ', msg);
        // Emit the message to ALL the connected sockets using the `io` variable
        io.emit('new chat message', user + ' : ' + msg);
    });
});
