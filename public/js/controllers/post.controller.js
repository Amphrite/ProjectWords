angular.module('postModule', ['naif.base64'])

.controller('postCtrl', function(postService, $scope, $rootScope, $geolocation, $location, $window, $http){
 		
 	$scope.posts = postService.query();

 	// Get position
  	$geolocation.getCurrentPosition({
    	timeout: 60000
  	}).then(function(position) {
		$scope.myPosition = position;
  	});	
	
	$scope.newPost = {};

	$scope.post = function() {
		var file = $scope.file;

		$scope.newPost.imageName = $scope.file.filename;
		$scope.newPost.image = $scope.file.base64;
		$scope.newPost.created_by = $rootScope.current_user.user.username;
		$scope.newPost.created_at = Date.now();
		$scope.newPost.latitude = $scope.myPosition.coords.latitude;
		$scope.newPost.longitude = $scope.myPosition.coords.longitude;
		
		postService.save($scope.newPost, function(){		
			$scope.newPost = {created_by: '', title: '', desc: '', tags: '', created_at: '', latitude: '', longitude: ''};
			$location.path('/frontpage');
		});	
	};
});