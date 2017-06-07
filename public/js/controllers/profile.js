'use strict';

var app = angular.module('profile.controller', []);

app.controller('ProfileController', function ($scope, $rootScope, $location, profileService) {
    console.log("profilectrl");
    profileService.getCurrentUser().then(function (data) {
        $scope.data = data;
        $rootScope.authenticated = true;
        console.log($rootScope.authenticated);
        
    }, function (err) {
        $rootScope.authenticated = false;

        console.log(err);
        $location.path('/');

    });

    $scope.date = moment().format('h:mm a ');
   
});


