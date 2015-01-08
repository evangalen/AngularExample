(function () {
  'use strict';

  angular
    .module('directive.mainHeader', [])
    .directive('mainHeader', mainHeader);

  mainHeader.$inject = [];

  /* @ngInject */
  function mainHeader() {
    // Usage:
    // 
    // Creates:
    // 
    var directive = {
      link: link,
      scope: {
        title: '=',
        subTitle: '='
      },
      templateUrl: 'common/directives/mainHeader/mainHeader.html',
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
    }
  }
})();