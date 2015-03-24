function sendForbidden(response) {
	response.writeHead(403);
	response.end('Forbidden');
}

function sendForm(response) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write("<!doctype html>");
	response.write("<html><body>");
	response.write("<form method='POST' action='/completed'>");
	response.write("<input type='text' name='data1'/>");
	response.write("<input type='text' name='data2'/>");
	response.write("<input type='text' name='data3'/>");
	response.write("<input type='text' name='data4'/>");
	response.write("<input type='submit' value='Send'/>");
	response.end("</form></body></html>");

}

function handleForm(request, response) {
	var data = '';
	request.on('data', function(buffer) {
		console.log('data : ', buffer.toString());
		data += buffer.toString() + ' ';
	});
	request.on('end', function() {
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.end(data);
	});
}

var http = require('http');
var server = http.createServer(function(request, response) {

	if (request.method == 'GET') {

		switch(request.url) {
			case '/form':
				sendForm(response);
				break;
			default:
				sendForbidden(response);
				break;
		}

	} else if (request.method == 'POST') {

		switch (request.url) {
			case '/completed':
				handleForm(request, response);
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
