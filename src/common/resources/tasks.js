(function () {
  'use strict';

  angular
    .module('resource.tasks', [])
    .factory('TaskResources', TaskResources);

  TaskResources.$inject = ['$resource'];

  /* @ngInject */
  function TaskResources($resource) {
    return $resource('/api/tasks/:id', {});
  }
})();