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

  LoginCtrl.$inject = ['$scope', 'Security'];

  /* @ngInject */
  function LoginCtrl($scope, Security) {
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
      }
    }
  }
})();