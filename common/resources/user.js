(function () {
  'use strict';

  angular
    .module('resource.user', [])
    .factory('UserResource', UserResource);

  UserResource.$inject = ['$resource'];

  /* @ngInject */
  function UserResource($resource) {

    return $resource('/api/current-user', {});

  }
})();