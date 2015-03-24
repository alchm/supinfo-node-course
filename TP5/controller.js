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
        response.render('index');
    },

    getForm: function(request, response, next) {
        response.render('form');
    },

    postForm: function(request, response, next) {
        // request.body contains HTTP body data parsed by the body-parser middleware
        var formValues = request.body;

        // save body data in session
        request.session.formValues = formValues;
        console.log('Session after form post : ', request.session);

        // pass the data to the view
        response.render('formReturn', {
            formValues: formValues
        });
    },

    // note that this controller does not verify if the request is an AJAX call
    // so if you type http://localhost:1337/delete/<itemId> in your browser, it will work too.
    deleteSessionRecord: function(request, response, next) {
        // request.params contains URL parameters
        var itemId = request.params.id;

        // delete will remove the object property
        delete request.session.formValues[itemId];
        console.log('Session after delete ('+itemId+') : ', request.session);

        // the ajax call will succeed
        response.sendStatus(200);
    }

};