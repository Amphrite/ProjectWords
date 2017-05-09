'use strict';

var app = angular.module('task.controller', []);


app.controller('taskCtrl', function($scope, $http, taskService) {   

    // GET FUNCTION //
    console.log("taskctrl");
    taskService.getCurrentTasks().then(function (data) {
        $scope.data = data;
        console.log(data.word);
    }),

        //POST FUNCTION//
    $scope.sub = function() {
    taskService.postTask($scope.formData).then(function (data){
       if(data) {
           console.log(data);
       }
       else {
           console.log(data.message);
       }
    })}
});



//  $http.post('/api/task', $scope.formData)
//         .success(function(data) {
//             console.log("posted successfully");
//         }).error(function(data) {
//             console.error("error in posting");
//         })

