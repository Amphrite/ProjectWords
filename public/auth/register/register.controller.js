function registerCtrl($location, authentication) {
var vm = this;

vm.credentials = {
  username : "",
  password : ""
};

vm.onSubmit = function () {
  authentication
    .register(vm.credentials)
    .error(function(err){
      alert(err);
    })
    .then(function(){
      $location.path('hej');
    });
};
