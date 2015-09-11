var angular = require('angular');
var module = angular.module('mainApp');

var edit = //
    '<div class="row">' +
    '       <form>' +
    '           <label for="exampleName">Name</label>' +
    '           <input type="text" class="form-control" id="exampleName" ng-model="example.name" placeholder="Enter example name">' +
    '       </form>' +
    '</div>' +
    '<div class="row">' +
    '       <form>' +
    '           <label for="exampleUrl">Url</label>' +
    '           <input type="text" class="form-control" id="exampleUrl" ng-model="example.url" placeholder="Enter example url">' +
    '       </form>' +
    '</div>' +
    '<div class="row">' +
    '   <button type="button" class="btn btn-default" ng-click="save()">Save</button>' +
    '   <button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button>' +
    '   <button type="button" class="btn btn-danger" ng-click="remove()">Delete</button>' +
    '</div>';

module.directive('exampleEdit', function ($location) {
    return {
        template: edit,
        restrict: 'E',
        scope: {
            id: '='
        },
        controller: function ($scope, $http, $filter) {
            $scope.save = function () {
                $http.post('api/example/save', $scope.example).success(function () {
                    $location.path("/example");
                });
            };
            $scope.cancel = function () {
                $location.path("/example");
            };
            $scope.remove = function () {
                $http.get('api/example/remove/' + $scope.id).success(function () {
                    $location.path("/example");
                });
            };
            // load
            $http.get('api/example/load/' + $scope.id).success(function (data) {
                $scope.example = data;
            });
        }
    };
});
