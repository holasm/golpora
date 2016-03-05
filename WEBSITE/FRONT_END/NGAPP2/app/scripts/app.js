'use strict';

/**
 * @ngdoc overview
 * @name appApp
 * @description
 * # appApp
 *
 * Main module of the application.
 */
angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngAudio'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .value('playList', {})
  // .value('urlValue', 'http://sundaysuspense.in/128%20kbps/Sadashib%20er%20Hoi%20Hoi%20Kando.mp3')
  .value('urlValue', 'http://p3.music.126.net/K0QjoMvUWloi4Tiq40z28g==/528865129033079.mp3')
  .value('viewportValue',{xs: 768, sm: 768, md: 992, lg: 1200})
