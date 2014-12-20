(function () {
  'use strict';

  angular
    .module('module.tasks.createTasks', ['module.tasks.tasksHelper'])
    .controller('CreateTasksCtrl', CreateTasksCtrl);

  CreateTasksCtrl.$inject = ['$scope', '$injector', '$state', 'TaskResources', 'AuthorTasksHelper'];

  /* @ngInject */
  function CreateTasksCtrl($scope, $injector, $state, TaskResources, AuthorTasksHelper) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'Create new tasks';

    activate();

    ////////////////

    function activate() {
      $scope.title = vm.title;
      $injector.invoke(AuthorTasksHelper, this, {
        $scope: $scope
      });
    }

    $scope.postData = function(data){
      TaskResources.save({}, data, function(data){
        $state.go('tasks');
      });
    }
  }
})();