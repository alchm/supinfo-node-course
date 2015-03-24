var fs = require('fs');

var pathToFile = process.argv[2];
fs.readFile(pathToFile, 'utf-8', function(err, fileString) {
	var lines = fileString.split('\n');
	console.log(lines.length - 1);
});
