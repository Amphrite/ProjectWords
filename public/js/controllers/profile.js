'use strict';

var app = angular.module('profile.controller', []);

app.controller('ProfileController', function ($scope, profileService) {
    profileService.getCurrentUser().then(function (data) {
        $scope.data = data;
    }, function (err) {
        console.log(err);
    });
});