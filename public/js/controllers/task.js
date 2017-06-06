'use strict';

var app = angular.module('task.controller', []);


app.controller('taskCtrl', function($rootScope, $scope, $http, $location, taskService, profileService) {   
    // GET FUNCTION //
    console.log("taskctrl");
    taskService.getCurrentTasks().then(function (data) {
        $scope.data = data;
        console.log(data.text);
    }),

    $scope.tags = [
       
    ]

    
    $scope.addTag = function () {
        var rng = Math.random().toString(36).substring(7);
        $scope.tags.push({
            id: rng,
            text: $scope.formData.word,
            desc: $scope.formData.wordDesc,
            
        }); 
    };

    $scope.removeTag = function(){
        $scope.tags.splice(this, 1);
        console.log($scope.tags);
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

