'use strict';

var app = angular.module('task.controller', []);

app.controller('taskCtrl', function($scope, $http) {    
    $scope.task = function() {
        console.log($scope.formData);
        $http.post('/api/task', $scope.formData)
        .success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    };
});

