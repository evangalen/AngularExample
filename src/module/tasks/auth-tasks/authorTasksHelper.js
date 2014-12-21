(function () {
  'use strict';

  angular
    .module('module.tasks.tasksHelper', [])
    .factory('AuthorTasksHelper', AuthorTasksHelper);

  AuthorTasksHelper.$inject = [];

  /* @ngInject */
  function AuthorTasksHelper() {
    return function ($scope) {

      var mirrorOptions = function(title, mode){
        var option = {
          title: title,
          opts: {
            mode: mode.toLocaleLowerCase(),
            onLoad: function(_cm) {
              option.cmInstance = _cm;
            },
            lineWrapping: true,
            lineNumbers: true
          }};
        return option;
      };

      $scope.inputOption = mirrorOptions('Input', 'text/html');
      $scope.jsOption = mirrorOptions('Behaviour', 'javascript');
      $scope.outputOption = mirrorOptions('Output', 'text/html');
      $scope.model = {
        name: '',
        description: '',
        input: '',
        behaviour: '',
        output: ''
      };

      $scope.selectedTab = function() {
        $scope.inputOption.cmInstance.refresh();
        $scope.jsOption.cmInstance.refresh();
        $scope.outputOption.cmInstance.refresh();
      };

      $scope.tryIt = function(){
        $scope.titleOut ='Title';
        $scope.review = true;
        $scope.dynamicInput = $scope.model.input;
      };

      $scope.launch = function(){
        $scope.dynamicOutput = $scope.model.output;
      };
    }
  }

  return AuthorTasksHelper;

})
();