(function () {
  'use strict';

  angular
    .module('directive.dynamicTemplates', [])
    .directive('dynamicTemplates', dynamicTemplates);

  dynamicTemplates.$inject = ['$compile'];

  /* @ngInject */
  function dynamicTemplates($compile) {
    // Usage:
    // 
    // Creates:
    // 
    var directive = {
      link: link,
      replace: true,
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.$watch(attrs.dynamicTemplates, function(html) {
        element.html(html);
        $compile(element.contents())(scope);
      });
    }
  }
})();