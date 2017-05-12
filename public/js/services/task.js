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

        postTask: function (testTags) {
        var deferred = $q.defer();
            $http.post('/api/task', testTags).then(function (res) { 
                deferred.resolve(res.data);
            }, function (res) {
                deferred.reject(res);
            });
            return deferred.promise;
            
        },
        

        getTask: function(taskId) {
            var deferred = $q.defer();
            console.log(taskId);
            $http.get('/api/task/' + taskId).then(function (res){
                deferred.resolve(res.data);
                console.log("Hejsa");
            }, function(res){
                deferred.reject(res);
            });
            return deferred.promise;
        },

        //Alle ord har en ID, Når der vælges et ord, skal det redirecte til en side med det givne ord .
        
    };
});


