(function () {
  'use strict';

  angular
    .module('app.login', ['ngCookies', 'ui.router', 'security.security', 'resource.user', 'ui.bootstrap'])
    .config(Config)
    .controller('LoginCtrl', LoginCtrl);

  Config.$inject = ['$stateProvider'];

  /* @ngInject */
  function Config($stateProvider) {
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
    var currentUser = $cookieStore.get('username');

    activate();

    ////////////////

    function activate() {

      $scope.closeAlert = function () {
        $scope.alert.done = !$scope.alert.done;
      };

      $scope.submit = function () {
        if ($scope.username && $scope.password) {
          Security.login($scope.username, $scope.password, function (data) {
            $scope.alert = data;
          });
        }
      };

      if (currentUser) {
        Security.redirect('index.html');
      }
    }
  }
})();