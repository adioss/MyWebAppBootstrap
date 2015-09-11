// require local modules
var jQuery = $ = require('jquery'); // jshint ignore:line
var angular = require('angular');
var ngGrid = require('ng-grid/build/ng-grid.min');
var modules = [
    require('angular-route'), //
    'ngGrid', //
    require('angular-bootstrap-npm') //
];

// create angular app
var mainApp = angular.module('mainApp', modules);
// require the custom modules
require('./menu');
require('./directive/exampleList');
require('./directive/exampleEdit');
// app configuration/router
mainApp.config(function ($routeProvider) {
    $routeProvider
        .when('/example', {
            template: "<div class='jumbotron'><example-list></example-list> </div>",
            controller: function ($scope) {

            }
        })
        .when('/example/:exampleId', {
            template: "<div class='jumbotron'><example-edit id='exampleId'></example-edit></div>",
            controller: function ($scope, $routeParams) {
                $scope.exampleId = $routeParams.exampleId;
            }
        });
});

