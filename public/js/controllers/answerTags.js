'use strict';

var app = angular.module('answerTags.controller', []);

app.controller('answerTagsCtrl', function ($scope, $http, $rootScope, $state, $location, answerService, taskService) {
  $scope.answerId = function () {
    console.log("Hello from MathiasAnswerTagsCtrl");
    $rootScope.globalAnswer = this.answer;
    console.log($rootScope.globalAnswer);
    
  }

taskService.getAnswers().then(function (data) {
        if (data) {
          $scope.answers = data;
        } else {
          console.log(data.message);
        };
      });

});

