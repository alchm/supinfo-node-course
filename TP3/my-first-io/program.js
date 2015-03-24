var fs = require('fs');

var pathToFile = process.argv[2];
var file = fs.readFileSync(pathToFile);

var lines = file.toString().split('\n');
console.log(lines.length-1);
