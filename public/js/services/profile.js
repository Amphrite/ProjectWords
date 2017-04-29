'use strict';

var app = angular.module('profile.service', []);

app.factory('profileService', function ($http, $q) {
    return {
        getCurrentUser: function () {
            var deferred = $q.defer();
            $http.get('/api/current').then(function (res) {
                deferred.resolve(res.data);
            }, function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },
    };
});


