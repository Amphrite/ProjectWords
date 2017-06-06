'use strict';

var app = angular.module('taskTags.controller', []);

app.controller("taskTagsCtrl", function($scope, $rootScope, $state, taskService){
      var current_taskId = $state.params.taskId;
      console.log(current_taskId);
      $scope.taskId = current_taskId;
      $scope.tagId = function(){
        console.log("Hello from andreas");
        $rootScope.globalTagId = this.task;
      }
      // Get all tasks in project
      taskService.getTaskTags(current_taskId).then(function (data) {
        if (data) {
          $scope.tasks = data;
          console.log(data);
        } else {
          console.log(data.message);
        };
      });

});