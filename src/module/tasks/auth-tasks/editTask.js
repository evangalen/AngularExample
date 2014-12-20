(function () {
  'use strict';

  angular
    .module('module.tasks.editTask', ['module.tasks.tasksHelper'])
    .controller('EditTaskCtrl', EditTaskCtrl);

  EditTaskCtrl.$inject = ['$scope', '$injector', 'PageService', 'taskData', 'AuthorTasksHelper'];

  /* @ngInject */
  function EditTaskCtrl($scope, $injector, PageService, taskData, AuthorTasksHelper) {
    /* jshint validthis: true */
    var vm = this;

    vm.activate = activate;
    vm.title = 'Edit Task';
    $scope.review = false;
    $scope.dynamicInput = '';
    $scope.dynamicOnput = '';

    activate();

    ////////////////

    function activate() {
      PageService.setTitle(vm.title);
      $scope.title = vm.title;

      $injector.invoke(AuthorTasksHelper, this, {
        $scope: $scope,
        this: this
      });

      $scope.model = {
        name: taskData.name,
        description: taskData.description,
        input: decodeURI(taskData.input),
        behaviour: decodeURI(taskData.behaviour),
        output: decodeURI(taskData.output)
      };

    }

  }
})();