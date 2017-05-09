'use strict';

var app = angular.module('task.service', []);

app.factory('taskService', function ($http, $q) {
    return {
        getCurrentTasks: function () {
            console.log("taskservice");
            var deferred = $q.defer();
            $http.get('/api/task').then(function (res) {
                deferred.resolve(res.data);
                console.log(res.data);
            }, function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
        },

        postTask: function (formData) {
            var deferred = $q.defer();
            $http.post('/api/task', formData).then(function (res) { 
                deferred.resolve(res.data);
            }, function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
            
        },
    };
});


