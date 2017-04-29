'use strict';

var app = angular.module('app', [
  'ui.router',
  'profile.controller',
  'profile.service',
  'dick.controller'
])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('frontpage', {
        url: '/',
        templateUrl: 'views/frontpage.html'
      })
    
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html'
      })

      .state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html'
        
      })

      .state('tasktest', {
        url: '/tasktest',
        templateUrl: 'views/tasktest.html',
        controller: 'ProfileController'
      })
      .state('tasktes2t', {
        url: '/tasktest2',
        templateUrl: 'views/tasktest2.html',
        controller: 'ProfileController'
      })
       
      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      });

       $locationProvider.html5Mode(true);
  });
