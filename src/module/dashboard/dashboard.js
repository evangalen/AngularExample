(function () {
  'use strict';

  angular
    .module('module.dashboard', [])
    .config(Config)
    .controller('Dashboard', Dashboard);

  Config.$inject = ['$stateProvider'];

  /* @ngInject */
  function Config($stateProvider){
    $stateProvider.state('dashboard', {
      url: '/dashboard',
      views: {
        '@': {
          templateUrl: 'module/dashboard/dashboard.html',
          controller: 'Dashboard'
        }
      }
    })
  }

  Dashboard.$inject = ['$scope', 'PageService'];

  /* @ngInject */
  function Dashboard($scope, PageService) {
    /* jshint validthis: true */
    var vm = this;
    vm.activate = activate;
    vm.title = 'Dashboard';

    activate();

    ////////////////

    function activate() {
      PageService.setTitle(vm.title);
    }
  }
})();