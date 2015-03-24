var fs = require('fs');

module.exports = {

    allInit: function(request, response, next) {
        console.log('All init');
        next();
    },

    allAuth: function(request, response, next) {
        console.log('All auth');
    },

    getIndex: function(request, response, next) {
        fs.readFile('./index.html', 'utf-8', function(err, fileString) {
            response.send(fileString);
        });
    },

    getForm: function(request, response, next) {
        fs.readFile('./form.html', 'utf-8', function(err, fileString) {
            response.send(fileString);
        });
    },

    postForm: function(request, response, next) {
        var json = {"result": "Success"};
        response.send(JSON.stringify(json));
    }

};