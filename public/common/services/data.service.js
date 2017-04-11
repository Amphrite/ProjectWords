function meanData ($http, authentication) {

  var getProfile = function () {
    return $http.get('/views/hej', {
      headers: {
        Authorization: 'Bearer '+ authentication.getToken()
      }
    });
  };

  return {
    getProfile : getProfile
  };
}
