// require the mongoose model
var Customer = require('./models/Customer');

module.exports = {

    /**
     * Send the Angular application (which is inside the app.html file)
     * @param request
     * @param response
     * @param next
     * @HTTP GET
     */
    getAngularApp: function(request, response, next) {

        // The `sendFile` method is used to read a file and send it to the client
        // It needs an absolute path to the file as first argument
        // OR a relative path if the `root` option is specified
        // The `options` object is the 2nd argument
        // The 3rd argument is the error callback
        // See the doc for more information: http://expressjs.com/api.html#res.sendFile
        response.sendFile('app.html', {root: './app/'}, function(err) {
            if (err) sendJSONError(response, 'Unable to serve Angular App');
            console.log(' Angular -> '.black.bgGreen+' sent to the client'.green);
        });

    },

    /**
     * Fetch all the customers in the database, then send it as JSON
     * @param request
     * @param response
     * @param next
     * @HTTP GET
     */
    getAllCustomers: function(request, response, next) {

        // The mongoose `find` method without a discriminant argument
        // returns an array with all the documents
        // See the doc for more information: http://mongoosejs.com/docs/api.html#query_Query-find
        Customer.find(function(err, customers) {
            if (err) sendJSONError(response, 'Cannot get all customers');
            else {
                // Set the HTTP status code
                response.status(200);
                // Send the JSON
                response.send(JSON.stringify(customers));
                logRequestSuccess('200 OK', 'Sent all customers');
            }
        });

    },

    /**
     * Send one customer fetched from the database using the the `id` URL parameter
     * @param request
     * @param response
     * @param next
     * @HTTP GET
     */
    getCustomer: function(request, response, next) {

        // Get the `id` parameter from the URL
        // using the `params` attribute of the request object (thanks to the body-parser middleware)
        var customerId = request.params.id;

        // The mongoose `findOne` method is used to find only one document in the database
        // See the doc: http://mongoosejs.com/docs/api.html#query_Query-findOne
        Customer.findOne({ID: customerId}, function (err, customer) {
            if (err) sendJSONError(response, 'Cannot get customer ' + customerId);
            else {
                // Set the HTTP status code and send the JSON
                response.status(200);
                response.send(JSON.stringify(customer));
                logRequestSuccess('200 OK', 'Sent customer '+customerId);
            }
        });

    },

    /**
     * Add a customer to the database using the JSON sent in the POST request
     * @param request
     * @param response
     * @param next
     */
    addCustomer: function(request, response, next) {

        // Using body-parser middleware, the request object is populated with the POST data in the `body` attribute
        var customerData = request.body;
        if (!customerData) sendJSONError(response, 'No data provided');

        // Create a new customer with the mongoose model
        var newCustomer = new Customer(customerData);
        // Then save it
        newCustomer.save(function (err, customer) {
            if (err) sendJSONError(response, 'Cannot save customer', customerData);
            else {
                // Set the HTTP 201 (Created) status code and send the JSON
                response.status(201);
                response.send(JSON.stringify(customer));
                logRequestSuccess('201 Created', 'Added customer '+customer.ID);
            }
        });

    },

    /**
     * Update a customer by providing an `id` parameter in the URL, and the updated values in the request body
     * @param request
     * @param response
     * @param next
     */
    updateCustomer: function(request, response, next) {

        // The `body` attribute contains the updated values (see `addCustomer` controller)
        var customerData = request.body,
            customerId = request.params.id;

        if (!customerData) sendJSONError(response, 'No data provided');
        else {
            // The mongoose `findOneAndUpdate` method is explicitly named ...
            // It takes the discriminant as first arg
            // The data to update as second arg
            // and the callback as third arg
            // See the doc: http://mongoosejs.com/docs/api.html#query_Query-findOneAndUpdate
            Customer.findOneAndUpdate({ID: customerId}, customerData, function(err, customer) {
                if (err) sendJSONError(response, 'Cannot update customer', customerData);
                else {
                    // Set the status code and send the JSON
                    response.status(200);
                    // `customer` contains the old values for the modified one
                    // Send the new values in `customerData` instead
                    response.send(JSON.stringify(customerData));
                    logRequestSuccess('200 OK', 'Updated customer '+customerId);
                }
            });
        }

    },

    /**
     * Delete a customer document by providing an `id` in the URL
     * @param request
     * @param response
     * @param next
     */
    deleteCustomer: function(request, response, next) {

        // Get the `id` param (see `getCustomer` controller)
        var customerId = request.params.id;

        // Use the `findOne` method from mongoose (see `getCustomer` controller)
        Customer.findOne({ ID: customerId }).remove(function(err, result) {
            // Set the HTTP 200 status code
            response.status(200);
            // Send a confirmation JSON
            response.send(JSON.stringify({ result: "Customer "+customerId+" successfully deleted" }));
            logRequestSuccess('200 OK', 'Deleted customer '+customerId);
        });

    }

};

/**
 * This is an helper function to send a JSON describing the error
 * @param response {Object} The Express ServerResponse object used to send the JSON
 * @param msg {String} The text message to send in the JSON
 * @param data {Mixed} (Optional) Any data that you want to send with the JSON
 */
function sendJSONError(response, msg, data) {
    // This is the returned JSON
    var error = { error: msg };
    // Set the optional `data` in the JSON if provided
    if (data) error.data = data;
    // Set the HTTP status code to 500 to warn the client
    response.status(500);
    // Send the JSON
    response.send(JSON.stringify(error));
    console.log(('Error (500) : '+msg).red);
}

/**
 * Helper function to log success in the server console
 * @param code {String} a representation of the HTTP status code
 * @param msg {String} The text message to log
 */
function logRequestSuccess(code, msg) {
    console.log(('HTTP ('+code+') : '+msg).cyan);
}