(function () {
  'use strict';

  angular
    .module('service.pageService', [])
    .factory('PageService', PageService);

  PageService.$inject = [];

  /* @ngInject */
  function PageService()
  {
    var Page = {};

    Page.title = '';

    Page.getTitle = function(){
      return Page.title;
    };

    Page.setTitle = function (newTitle) {
      Page.title = newTitle;
    };

    return Page;
//    var service = {
//      title: '',
//      getTitle: getTitle,
//      setTitle: setTitle
//    };
//
//    return service;
//
//    ////////////////
//
//    function getTitle() {
//      return service.title;
//    }
//    function setTitle(title) {
//      service.title = title;
//    }
  }
})();