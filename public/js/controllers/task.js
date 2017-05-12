'use strict';

var app = angular.module('task.controller', []);


app.controller('taskCtrl', function($rootScope, $scope, $http, $location, taskService, profileService) {   
    // GET FUNCTION //
    console.log("taskctrl");
    taskService.getCurrentTasks().then(function (data) {
        $scope.data = data;
        console.log(data.word);
    }),

    $scope.tags = [
       
    ]

    $scope.addTag = function () {
        console.log("hejsas")
        $scope.tags.push({
            text: $scope.formData.word
        }); 
    };

        //POST FUNCTION//
    $scope.sub = function() {

        var dataset = {
            tag: $scope.tags
        };
        var testTags = angular.extend({},$scope.formData, dataset);
        console.log(testTags);
     
    taskService.postTask(testTags).then(function (data){
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

