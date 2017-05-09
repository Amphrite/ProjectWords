'use strict';

var app = angular.module('answer.controller', []);

app.controller('answerCtrl', function($scope, $http, $rootScope, $state, $location, profileService, taskService) {   
        
      var current_taskId = $state.params.taskId;
      console.log(current_taskId);
      // Get all tasks in project
      taskService.getTask(current_taskId).then(function (data) {
        if (data) {
          $scope.tasks = data;
        } else {
          console.log(data.message);
        };
      });
 
    profileService.getCurrentUser().then(function (data) {
        $scope.data = data;
        $rootScope.authenticated = true;
        console.log($rootScope.authenticated);
        
    }, function (err) {
        $rootScope.authenticated = false;

        console.log(err);
        $location.path('/');

    });
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