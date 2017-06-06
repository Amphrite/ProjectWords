'use strict';

var app = angular.module('answer.service', []);

app.factory('answerService', function ($http, $q) {
return {
getAnswerTags: function(answerId) {
            var deferred = $q.defer();
            console.log(answerId);
            $http.get('/api/answertags/' + answerId).then(function (res){
                deferred.resolve(res.data);
                console.log(res.data);
            }, function(res){
                deferred.reject(res);
            });
            return deferred.promise;
        },
        putAnswers: function(taskId, data) {
            var deferred = $q.defer();
            console.log(taskId);
            console.log(data);
            $http.put('/api/answer/' + taskId, data).then(function (res) {
                deferred.resolve(res.data);
                console.log(res.data);
            }, function(res){
                deferred.reject(res);
            });
            return deferred.promise;
        }
}
});