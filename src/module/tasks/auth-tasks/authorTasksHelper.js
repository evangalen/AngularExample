(function () {
  'use strict';

  angular
    .module('module.tasks.tasksHelper', [])
    .factory('AuthorTasksHelper', AuthorTasksHelper);

  AuthorTasksHelper.$inject = [];

  /* @ngInject */
  function AuthorTasksHelper() {
    return function ($scope) {

      var mirrorOptions = function (title, mode) {
        var option = {
          title: title,
          opts: {
            mode: mode.toLocaleLowerCase(),
            lineWrapping: true,
            lineNumbers: true
          }};
        return option;
      };

      $scope.model = {
        name: '',
        description: '',
        input: '',
        behaviour: '',
        output: ''
      };

      $scope.selectedTab = function () {
        $scope.inputOption = mirrorOptions('Input', 'text/html');
        $scope.jsOption = mirrorOptions('Behaviour', 'javascript');
        $scope.outputOption = mirrorOptions('Output', 'text/html');
//        $('#mainContainer').split({orientation:'vertical', limit:100, position:'50%'});
//        $('#leftContainer').split({orientation:'horizontal', limit:100});
//        $('#rightContainer').split({orientation:'horizontal', limit:100});
      };

      $scope.tryIt = function () {
        $scope.titleOut = 'Title';
        $scope.review = true;
        $scope.dynamicInput = $scope.model.input;
      };

      $scope.launch = function () {
        $scope.dynamicOutput = $scope.model.output;
      };
    }
  }

  return AuthorTasksHelper;

})
();