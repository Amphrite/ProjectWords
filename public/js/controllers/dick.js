'use strict';

var app = angular.module('dick.controller', []);

app.controller('DickController', function ($http, $location, $scope, $rootScope) {
    console.log("Dick");
    console.log($rootScope.authenticated);
    console.log($scope.data);
    
    $scope.dick = function(){
        console.log("bøz");
  

            $http({
            method: 'GET',
            url: '/auth/logout'
                }).then(function successCallback(response) {
                    console.log("successful logout?");
                    $location.path('/frontpage');
                }, function errorCallback(response) {
                console.log("Lort");
        });
    };
});

