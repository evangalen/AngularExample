(function () {
  'use strict';

  angular
    .module('module.tasks', ['module.tasks.details', 'module.tasks.createTasks', 'module.tasks.editTask'])
    .config(Config)
    .controller('TasksCtrl', TasksCtrl);

  Config.$inject = ['$stateProvider'];
  /* @ngInject */
  function Config($stateProvider) {

    $stateProvider.state('tasks', {
      url: '/tasks',
      views: {
        '@': {
          templateUrl: 'module/tasks/tasks.html',
          controller: 'TasksCtrl'
        }
      }
    }).state('tasks.detail', {
      url: '/:id',
      views: {
        '@': {
          templateUrl: 'module/tasks/details/details.html',
          controller: 'DetailsCtrl',
          resolve: {
            taskData: ["$stateParams", "TaskResources", function ($stateParams, TaskResources) {
              return TaskResources.get({ id: $stateParams.id }).$promise;
            }]
          }
        }
      }
    }).state('tasks.create', {
      url: '/create',
      views: {
        '@': {
          templateUrl: 'module/tasks/auth-tasks/auth-tasks.html',
          controller: 'CreateTasksCtrl'
        }
      }
    }).state('tasks.edit', {
      url: '/edit/:id',
      views: {
        '@': {
          templateUrl: 'module/tasks/auth-tasks/authTasks.html',
          controller: 'EditTaskCtrl',
          resolve: {
            taskData: ["$stateParams", "TaskResources", function ($stateParams, TaskResources) {
              return TaskResources.get({ id: $stateParams.id }).$promise;
            }]
          }
        }
      }
    })
  }

  TasksCtrl.$inject = ['$scope', 'TaskResources', 'PageService'];

  /* @ngInject */
  function TasksCtrl($scope, TaskResources, PageService) {
    /* jshint validthis: true */
    var vm = this;
    vm.activate = activate;
    vm.title = 'Browse Tasks';

    activate();

    ////////////////

    function activate() {
      $scope.title = vm.title;
      PageService.setTitle(vm.title);
      loadTasks();

      $scope.delete = function (task) {
        deleteTask(task.id);
        loadTasks();
      };
    }

    function loadTasks() {
      TaskResources.query(function (data) {
        $scope.tasks = data;
      });
    }

    function deleteTask(taskId) {
      TaskResources.delete({id: taskId}, function (data) {
        console.log(data);
      });
    }

  }
})();