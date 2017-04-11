

  angular.module('meanApp', ['ngRoute', 'loginModule', 'registerModule', 'hejModule', 'navigationModule', 'authenticationModule'])

  .config(function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/frontpage.html',
        // controller: 'frontpageCtrl',
        controllerAs: 'vm'
      })
      .when('/register', {
        templateUrl: '/views/register.html',
        controller: 'registerCtrl',
        controllerAs: 'vm'
      })
      .when('/login', {
        templateUrl: '/views/login.html',
        controller: 'loginCtrl',
        controllerAs: 'vm'
      })
      .when('/hej', {
        templateUrl: '/views/hej.html',
        controller: 'hejCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  

  function run($rootScope, $location, authentication) {
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
      if ($location.path() === '/hej' && !authentication.isLoggedIn()) {
        $location.path('/');
      }
    });
  }

  // angular
  //   .module('meanApp')
  //   .config(['$routeProvider', '$locationProvider', config])
  //   .run(['$rootScope', '$location', 'authentication', run]);

})
