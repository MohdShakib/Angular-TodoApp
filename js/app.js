
'use strict';

var todoApp = angular.module('todoApp',[
    'ngRoute',
    'ui.bootstrap', 
    'ui.bootstrap.datetimepicker',
    'todoAppFactory',
    'todoAppFilter',
    'todoAppController'
]);

todoApp.config(['$routeProvider', '$locationProvider',
   function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .when('/add', {
                templateUrl: 'views/add.html',
                controller: 'AddController'
            })
            .when('/edit/:taskID', {
                templateUrl: 'views/add.html',
                controller: 'FormController',
            });


        $locationProvider.html5Mode(false).hashPrefix('!');

}]);