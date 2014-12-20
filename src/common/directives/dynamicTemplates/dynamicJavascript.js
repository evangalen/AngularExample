(function () {
  'use strict';

  angular
    .module('directive.dynamicJavascript', [])
    .directive('dynamicJavascript', dynamicTemplates);

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
      scope.$watch(attrs.dynamicJavascript, function(html) {
        element.html(html);
        $compile(element.contents())(scope);
      });
    }
  }
})();