'use strict';

var app = angular.module('app', [
  'ui.router',
  'profile.controller',
  'profile.service',
  'task.service',
  'logout.controller',
  'answer.controller',
  'task.controller'
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
        url: '/tasktest3',
        templateUrl: 'views/tasktest3.html',
        controller: 'taskCtrl'
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
      });



       $locationProvider.html5Mode(true);
  });
