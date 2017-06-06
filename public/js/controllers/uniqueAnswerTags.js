'use strict';

var app = angular.module('uniqueAnswerTags.controller', []);

app.controller('uniqueAnswerTagsCtrl', function ($scope, $http, $rootScope, $state, $location, answerService, taskService) {
  var current_answerId = $state.params.answerId;
  console.log(current_answerId);
  $scope.answer = $rootScope.globalAnswer.answer;
  console.log($scope.answer);
  console.log("vigtig console log");

  taskService.getTask(current_taskId).then(function (data) {
        if (data) {
          $scope.tasks = data;
        } else {
          console.log(data.message);
        };
      });
});




