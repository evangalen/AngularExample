(function () {
  'use strict';

  angular
    .module('security.security', ['resource.user'])
    .factory('Security', Security);

  Security.$inject = ['$http', '$cookieStore', '$q'];

  /* @ngInject */
  function Security($http, $cookieStore, $q) {
    var service = {
      currentUser: {},
      isAuthenticated: isAuthenticated,
      getLoginReason: getLoginReason,
      requestCurrentUser: requestCurrentUser,
      isAdmin: isAdmin,
      redirect: redirect,
      login: login,
      logout: logout
    };

    return service;

    ////////////////

    // Is the current user authenticated?
    function isAuthenticated(){
//      return !!service.currentUser;
    }

    function requestCurrentUser(callback) {
      $http.get('/api/auth/current-user').success(function(data, status, headers, config) {
        service.currentUser = data;
        callback(service.currentUser);
      });

    }

    function isAdmin(){
      return !!(true);
    }

    // Get the first reason for needing a login
    function getLoginReason() {
//      if (!$cookieStore.get('username')) {
//        service.logout();
//      }
    }

    // Attempt to authenticate a user by the given username
    function login(username, password, callback) {
      var alert = {
        type: 'danger',
        done: true,
        msg: 'Incorrect username or password.'
      };

      $http.post('/api/auth/login', {username: username, password: password, remember: true})
        .success(function(data) {
          if(data == 'true') redirect();
          else callback(alert);
      });

    }

    // Redirect to the given url
    function redirect(url) {
      url = url || 'index.html';
      location.href = url;
    }

    // Logout the current user and redirect
    function logout() {
      service.redirect('login.html');
//      $http.get('api/auth/logout').then(function (data) {
//        service.currentUser = null;
//        service.redirect('app/home');
//      });
    }

  }
})();