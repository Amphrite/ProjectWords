angular.module('memberzModule', [])

.controller('MemberCtrl', function($scope, $http, $rootScope, $location){
	$scope.user = {
		username: '', 
		password: '', 
		firstName: '', 
		lastName: '', 
		email: '' 

	};
	$scope.error_message = '';

	 $scope.login = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data;
        $location.path('/profile');
        console.log(data);
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };

  $scope.register = function(){
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data;
        $location.path('/profile');
        console.log(data);
      }
      else{
        $scope.error_message = data.message;
      }
    });
  };
});