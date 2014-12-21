(function () {
  'use strict';

  angular
    .module('app.login', ['ngCookies', 'ui.router', 'security.security', 'resource.user', 'ui.bootstrap'])
    .config(Config)
    .controller('LoginCtrl', LoginCtrl);

  Config.$inject = ['$stateProvider'];

  /* @ngInject */
  function Config($stateProvider){
    $stateProvider.state('login', {
      url: '/login',
      views: {
        '@': {
          templateUrl: 'module/login/login.html',
          controller: 'LoginCtrl'
        }
      }
    })
  }

  LoginCtrl.$inject = ['$scope', 'Security', '$cookieStore'];

  /* @ngInject */
  function LoginCtrl($scope, Security, $cookieStore) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'login';

    activate();

    ////////////////

    function activate() {

      $scope.closeAlert = function() {
        $scope.alert.done = !$scope.alert.done;
      };

      $scope.submit = function(){
          if ($scope.username && $scope.password) {
            Security.login($scope.username, $scope.password, function(data){
              $scope.alert = data;
            });
          }
      };

//      $cookieStore.put('myFavorite','oatmeal');
//      // Get cookie
//      var favoriteCookie = $cookieStore.get('myFavorite');
//      console.log(favoriteCookie);
//      // Removing a cookie
//      $cookieStore.remove('myFavorite');

      var currentUser = $cookieStore.get('username');
      if (currentUser) {
        Security.redirect('index.html');
      }
//      ;$cookieStore.put('username', btoa($scope.username))
//      console.log($cookieStorage.get('username'));
    }
  }
})();