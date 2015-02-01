'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope, $http) {

        $http({
            method: 'GET',
            url: '/api/name'
        }).
            success(function (data, status, headers, config) {
                $scope.name = data.name;
            }).
            error(function (data, status, headers, config) {
                $scope.name = 'Error!';
            });

    }).
    controller('GreetController', function ($scope) {
        // write Ctrl here

    }).
    controller('GuestbookController', function ($scope,$http) {
        // write Ctrl here
        //retrieve the button click
        $scope.saveMessage = function(){
            alert("The button has been clicked!");
        }

    }).
    controller('SettingsController', function ($scope) {
        // write Ctrl here

    }).
    controller('SignController', function ($scope) {
        // write Ctrl here

    });
