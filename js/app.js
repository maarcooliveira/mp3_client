var demoApp = angular.module('demoApp', ['ngRoute', 'demoControllers', 'demoServices']);

demoApp.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {

   $httpProvider.defaults.headers.post  = {'Content-Type': 'application/x-www-form-urlencoded'};
   $httpProvider.defaults.headers.put  = {'Content-Type': 'application/x-www-form-urlencoded'};
  $routeProvider.
    when('/users', {
    templateUrl: 'partials/users.html',
    controller: 'UserController'
  }).
  when('/tasks', {
    templateUrl: 'partials/tasks.html',
    controller: 'TaskController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/users/new', {
    templateUrl: 'partials/newuser.html',
    controller: 'UserNewController'
  }).
  when('/users/info/:id', {
    templateUrl: 'partials/userinfo.html',
    controller: 'UserInfoController'
  }).
  when('/tasks/new', {
    templateUrl: 'partials/newtask.html',
    controller: 'TaskNewController'
  }).
  when('/tasks/edit/:id', {
    templateUrl: 'partials/edittask.html',
    controller: 'TaskEditController'
  }).
  when('/tasks/info/:id', {
    templateUrl: 'partials/taskinfo.html',
    controller: 'TaskInfoController'
  }).
  otherwise({
    redirectTo: '/settings'
  });
}]);