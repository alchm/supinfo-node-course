function sendForbidden(response) {
	response.writeHead(403);
	response.end('Forbidden');
}

function sendForm(fs, response) {
	fs.readFile('./form.html', function(err, buffer) {
		if (err) {
			response.writeHead(500);
			response.end('Internal server error: cannot read "form.html"');
		} else {
			response.writeHead(200);
			response.end(buffer);
		}
	});
}

function handleForm(urlModule, request, response) {
	var parsedRequest = urlModule.parse(request.url, true);
	response.writeHead(200, {'Content-Type': 'application/json'});
	response.end(JSON.stringify(parsedRequest));
}

var http 	= require('http'),
	fs 		= require('fs'),
	url 	= require('url');

var server = http.createServer(function(request, response) {

	if (request.method == 'GET') {

		switch(request.url) {
			case '/form':
				sendForm(fs, response);
				break;
			default:
				sendForbidden(response);
				break;
		}

	} else if (request.method == 'POST') {

		switch (request.url) {
			case '/completed':
				handleForm(url, request, response);
				break;
			default:
				sendForbidden(response);
				break;
		}

	} else {
		sendForbidden(response);
	}

});
server.listen(1337);
console.log('Node HTTP server listening on port 1337');
