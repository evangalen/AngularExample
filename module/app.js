(function () {
  'use strict';

  angular.module('app.resources', [
    'resource.tasks',
    'resource.user'
  ]);

  angular.module('app.services', [
    'service.pageService'
  ]);

  angular.module('app.directives',[
    'directive.dynamicTemplates'
  ]);

  angular.module('app.securities',[
    'security.security'
  ]);

  angular.module('app.modules', [
    'module.dashboard',
    'module.tasks'
  ]);

  angular.module('app.libraries',[
    'ngResource',
    'ui.codemirror',
    'ui.router',
    'ui.bootstrap',
    'ngCookies'
  ]);

  angular.module('App', [
    'app.libraries',
    'app.resources',
    'app.services',
    'app.directives',
    'security.security',
    'app.login',
    'app.modules'
  ]);

  angular.module('App')
    .run(AppRun)
    .config(Config)
    .controller('MainCtrl', MainCtrl);

  AppRun.$inject = ['$cookieStore', 'Security'];

  function AppRun($cookieStore, Security){
    Security.getLoginReason();
    $cookieStore.put('username', 'a');
  }

  Config.$inject = ['$urlRouterProvider'];

  /* @ngInject */
  function Config($urlRouterProvider){
    $urlRouterProvider.otherwise('/dashboard');
  }

  MainCtrl.$inject = ['$scope', 'PageService', 'Security', '$http'];
  /* @ngInject */
  function MainCtrl($scope, PageService, Security, $http) {
    /* jshint validthis: true */
    var vm = this;
    vm.activate = activate;
    vm.title = 'Dashboard';

    activate();

    ////////////////

    function activate() {
      $scope.PageService = PageService;
      Security.requestCurrentUser(function(data){
        $scope.currentUser = data.username;
        $scope.userMode = data.mode;
      });
      $scope.adminMode = Security.isAdmin();
      console.log(Security.isAdmin());
    }
  }
})();