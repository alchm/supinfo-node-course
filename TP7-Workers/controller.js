var fs = require('fs');
var workerData = [];
var id = 0;

var interval = setInterval(function() {
    id = id+1;
    var data = {
        id: id,
        timestamp: new Date().getTime()
    };
    workerData.push(data);
    console.log('New data ! --> ', data);
}, 3000);

module.exports = {

    getWorkerData: function(request, response, next) {
        response.send(JSON.stringify(workerData));
    },

    getWorkerPage: function(request, response, next) {
        fs.readFile('./templates/worker.html', 'utf-8', function(err, html) {
            response.send(html);
        });
    }

};