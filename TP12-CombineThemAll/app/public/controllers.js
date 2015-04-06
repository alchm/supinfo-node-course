/**
 * Created by baptiste on 2015-03-31.
 */
// This is the Express server address
var SERVER_URL = 'http://localhost:1337';
/**
 * This is our main controller
 * It uses the $http service as a dependency
 */
CustomerApp.controller('CustomerCtrl', function($scope, $http) {

    // Initialize the customers array in the scope
    $scope.customers = [];

    // The customers array is empty and it must be initialized with the data from the server
    // Make an HTTP GET call to the server
    // It is targeting the /customers URL defined in the Express router
    $http.get(SERVER_URL+'/customers') // "http://localhost:1337/customers" (try it in your browser)
        .success(function(data, status, headers) {
            console.log('Received data from GET /customers : ', data);
            // The array containing the customers must have been returned by the server
            // It is populated in the `data` variable
            // Set the data to the scope customers array
            $scope.customers = data;
        })
        .error(function(data, status, headers) {
            // The server returned an error
            // You could display an error message or whatever ...
            console.log('Can not get the customers : ', data);
        });

    /**
     * Remove a customer by making a call to the server
     * @param customer {Object} a Customer instance
     */
    $scope.deleteCustomer = function(customer) {

        // Make an HTTP DELETE call to the server
        // It is targeting the /customer/:id route
        $http.delete(SERVER_URL+'/customer/'+customer.ID)
            .success(function(data, status, headers) {
                console.log('Received data from DELETE /customer/'+customer.ID+' : ', data);
                // Get the index of the customer to delete
                var index = $scope.customers.indexOf(customer);
                // Remove it from the customers array
                $scope.customers.splice(index, 1);
            })
            .error(function(data, status, headers) {
                // The server returned an error
                // You could display an error message or whatever ...
                console.log('Can not delete the customer '+customer.ID+' : ', data);
            });

    };

    /**
     * Add a customer by making a call to the server
     * @param customer
     */
    $scope.addCustomer = function(customer) {

        // Clear the `newCustomer` model in the view
        $scope.newCustomer = {};
        // Create a new Customer instance with the given arguments
        var customerModel = new Customer(customer.firstName, customer.lastName, new Date().getTime(), customer.website);

        // Send an HTTP POST request to the server
        // It will trigger the /customer route defined in Express router
        // The second argument is the data body to sen with the request
        $http.post(SERVER_URL+'/customer', customerModel)
            .success(function(data, status, headers) {
                console.log('Received data from POST /customer : ', data);
                // Push the created Customer instance to the scope customers array
                $scope.customers.push(data);
            })
            .error(function(data, status, headers) {
                // Error ...
                console.log('Can not add the customer : ', customer);
                console.log('Server responded with : ', data);
            });

    };

    /**
     * Update a customer by making a call to the server
     * @param customer
     */
    $scope.updateCustomer = function(customer) {

        // Send an HTTP PUT request to the server
        // Trigger the /customer/:id route
        // Set the modified customer as second argument to send it in the request body
        $http.put(SERVER_URL+'/customer/'+customer.ID, customer)
            .success(function(data, status, headers) {
                // No need to do anything more, the Customer object is already updated in the customers array
                console.log('Received data from PUT /customer/'+customer.ID+' : ', data);
            })
            .error(function(data, status, headers) {
                // Error ...
                console.log('Can not update the customer '+customer.ID+' : ', data);
            });

    };

});