/**
 * Created by baptiste on 2015-03-30.
 */
var app = angular.module('DemoApp', []);

app.controller('DemoCtrl', function($scope) {

    $scope.elements = [];
    $scope.pushEl = function(el) {
        this.elements.push(el);
        this.elToPush = {};
    }

});