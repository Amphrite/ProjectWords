'use strict';

var app = angular.module('answer.controller', []);

app.controller('answerCtrl', function($scope, $http, $rootScope, $state, $location, profileService, taskService, answerService) {   
        
      var current_taskId = $state.params.taskId;
      $scope.myTagId = $rootScope.globalTagId; 
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

    $scope.formData = [
       
    ]

    $scope.sub = function() { 
       $scope.formData.push({
         id: $rootScope.globalTagId._id
       });
       console.log($scope.formData);

       answerService.putAnswers(current_taskId, $scope.formData).then(function (data) {
         if (data) {
           console.log("success");
         } else {
           console.log("error");
         }
       });

        /*$http.put('/answer/' + current_taskId, $scope.formData).
        success(function(data) {
            console.log("posted successfully");
        }).error(function(data) {
            console.error("error in posting");
        })*/
    };


    taskService.getAnswers().then(function (data) {
        if (data) {
          $scope.answers = data;
        } else {
          console.log(data.message);
        };
      });
});