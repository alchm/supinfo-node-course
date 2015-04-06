/**
 * Created by baptiste on 2015-03-30.
 */
app.controller('ProductCtrl', function($scope) {

    var products = [
        new Product('iPhone 6', 'The best iPhone ever', 1000000),
        new Product('iPhone 6+', 'A revolution', 10000000000),
        new Product('Apple Care Plan', 'Just what you need for your "flexible" phone', 20000),
        new Product('Nexus 6', 'Great phone', 30000)
    ];

    $scope.products = products;

    $scope.addProduct = function(p) {
        p = new Product(p.name, p.description, p.price);
        products.push(p);
        this.newProduct = {};
    };

    $scope.deleteProduct = function(p) {
        products.splice(products.indexOf(p), 1);
    };

    $scope.tableSort = "name";


    $scope.sortTable = function(order) {
        $scope.tableSort = order;
    };

    //$scope.resultsLimit = 10;

});