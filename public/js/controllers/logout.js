'use strict';

var app = angular.module('logout.controller', []);

app.controller('logoutController', function ($http, $location, $scope, $rootScope) {
    
    console.log($rootScope.authenticated);
    console.log($scope.data);
    
    $scope.logout = function(){
        
  

            $http({
            method: 'GET',
            url: '/auth/logout'
                }).then(function successCallback(response) {
                    console.log("successful logout");
                    $location.path('/');
                }, function errorCallback(response) {
                    $location.path('/');
        });
    };
});

