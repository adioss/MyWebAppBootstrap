var angular = require('angular');
var module = angular.module('mainApp');

var list = //
    '<div class="row">' +
    '   <div class="container-fluid">' +
    '       <div class="row">' +
    '           <button type="button" class="btn btn-primary" ng-click="create()">New</button>' +
    '       </div>' +
    '       <div class="row">' +
    '           <div class="gridStyle" ng-grid="gridOptions"></div>' +
    '       </div>' +
    '</div>';

module.directive('exampleList', function ($location) {
    return {
        template: list,
        restrict: 'E',
        replace: true,
        scope: {},
        controller: function ($scope, $http) {
            $scope.gridOptions = {
                data: 'examples',
                afterSelectionChange: function (rowItem) {
                    $location.path("/example/" + $scope.examples[rowItem.rowIndex].id);
                }
            };
            $scope.create = function () {
                $location.path("/example/new");
            };

            // load
            $http.get('api/example/list').success(function (data) {
                $scope.examples = data;
            });
        }
    };
});
