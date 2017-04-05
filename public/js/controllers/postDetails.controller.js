angular.module('postIdModule', [])

.controller('postDetailsCtrl', function(postService, $resource, $http, $scope, $rootScope, $geolocation, $stateParams, $location){
	
	$http.get('/api/posts/'+$stateParams.id).success(function(data){
		$scope.post = data;
	});	


	$scope.PostComment = function(){
		var post = $scope.post;
		
		if(post.comments == null) {		
			post.comments = [];	
		}
		
		post.comments.push({
				comment : $scope.newComment.comment,
				created_by : $rootScope.current_user.user.username,
				created_at : Date.now()
				
		});		

		$http.put('/api/posts/'+$stateParams.id, post).success(function(data, status){
		 	console.log(status);
			$scope.post = data;

	 		console.log($scope.post);
	 	});

	 	$scope.counted = $scope.post.comments.length;
	};	
})
