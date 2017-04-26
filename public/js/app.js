'use strict';

var app = angular.module('app', [
  'ui.router',
  'profile.controller',
  'profile.service'
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

      .state('profile', {
        url: '/profile',
        templateUrl: 'views/profile.html',
        controller: 'ProfileController'
      });

       $locationProvider.html5Mode(true);
  });
