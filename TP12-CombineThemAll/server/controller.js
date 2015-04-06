var FormData = require('./models/FormData');

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

        for (var key in formValues) {
            var myFormData = new FormData({
                key: key,
                value: formValues[key]
            });
            myFormData.save(function (err, formData) {
                if (err) return console.error(err);
                console.log('Saved new form data : ', formData);
            });
        }

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

        FormData.find({ key: itemId }).remove(function(err, result) {
            if (err) return console.error(err);
            console.log('Removed form data : ', result);
        });

        // the ajax call will succeed
        response.sendStatus(200);
    }

};