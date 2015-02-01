'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/greet', {
      templateUrl: 'partials/greet',
      controller: 'GreetController'
    }).
    when('/guestbook', {
      templateUrl: 'partials/guestbook',
      controller: 'GuestbookController'
    }).
    when('/settings', {
        templateUrl: 'partials/settings',
        controller: 'SettingsController'
    }).
    when('/sign', {
        templateUrl: 'partials/sign',
        controller: 'SignController'
      }).
    otherwise({
      redirectTo: '/greet'
    });

  $locationProvider.html5Mode(true);
});
