(function () {
  'use strict';

  angular
    .module('module.history', [])
    .config(Config)
    .controller('HistoryCtrl', HistoryCtrl);

  Config.$inject = ['$stateProvider'];

  function Config($stateProvider) {
    $stateProvider.state('history', {
      url: '/history',
      views: {
        '@': {
          templateUrl: 'module/history/history.html',
          controller: 'HistoryCtrl'
        }
      }
    })
  }

  HistoryCtrl.$inject = ['$scope'];

  /* @ngInject */
  function HistoryCtrl($scope) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'history';

    activate();

    ////////////////

    function activate() {
      $scope.title = 'Timeline';
    }
  }
})();