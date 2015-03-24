var fs = require('fs');
var path = require('path');
var pathToDir = process.argv[2];
var extensionFilter;
if (process.argv[3]) {
	extensionFilter = process.argv[3];
}
fs.readdir(pathToDir, function(err, list) {
	for (var i=0; i<list.length; i=i+1) {
		var file = list[i];
		if (extensionFilter) {
			if (path.extname(file) == '.'+extensionFilter) {
				console.log(file);
			}
		} else {
			console.log(file);		
		}
	}
}); 
