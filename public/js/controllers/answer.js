'use strict';

var app = angular.module('answer.controller', []);

app.controller('answerCtrl', function($scope, $http) {    
    $scope.sub = function() {
        console.log($scope.formData);
        $http.post('/api/answer', $scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })
    };
});