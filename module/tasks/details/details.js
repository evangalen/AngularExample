(function () {
  'use strict';

  angular
    .module('module.tasks.details', [])
    .controller('DetailsCtrl', DetailsCtrl);

  DetailsCtrl.$inject = ['$scope', 'TaskResources', 'PageService', 'taskData'];
  /* @ngInject */
  function DetailsCtrl($scope, TaskResources, PageService, taskData) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'Browser Details';

    activate();

    ////////////////

    function activate() {
      PageService.setTitle(vm.title);
      $scope.model = {
        title: taskData.name,
        description: taskData.description
      };
      $scope.outputModel = {};
      $scope.inputModel = decodeURI(taskData.input);
      $scope.jsModel = decodeURI(taskData.behaviour);
      $scope.outputModel = decodeURI(taskData.output);

      $scope.launch = function () {
        $scope.dynamicOutput = angular.copy($scope.outputModel);
      }
    }
  }
})();