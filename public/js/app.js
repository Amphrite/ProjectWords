'use strict';

var app = angular.module('app', [
  'ui.router',
  'profile.controller',
  'profile.service',
  'task.service',
  'answer.service',
  'logout.controller',
  'answer.controller',
  'task.controller',
  'signup.controller',
  'taskTags.controller',
  'answerTags.controller',
  'uniqueAnswerTags.controller'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('frontpage', {
        url: '/frontpage',
        controller: 'ProfileController',
        templateUrl: 'views/frontpage.html'
      })
    
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html'
      })

      .state('signup', {
        url: '/signup',
        controller: 'signupController',
        templateUrl: 'views/signup.html'
      })

      .state('tasktest', {
        url: '/tasktest',
        templateUrl: 'views/tasktest.html',
        controller: 'taskCtrl'
      })
      
      .state('tasktest2', {
        url: '/tasktest2/:taskId',
        templateUrl: 'views/tasktest2.html',
        controller: 'answerCtrl'
      })

      .state('tasktest3', {
        url: '/tasktest3/:taskId',
        templateUrl: 'views/tasktest3.html',
        controller: 'taskTagsCtrl'
      })
       
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      })

      .state('admin', {
        url: '/admin',
        templateUrl: 'views/admin.html',
        controller: 'taskCtrl'
      })

      .state('opgaver', {
        url: '/opgaver',
        templateUrl: 'views/opgaver.html',
        controller: 'answerTagsCtrl'
      })

      .state('opgaver2', {
        url: '/opgaver2/:answerId',
        templateUrl: 'views/opgaver2.html',
        controller: 'uniqueAnswerTagsCtrl'
      });
      
       $locationProvider.html5Mode(true);
  });
