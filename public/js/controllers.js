'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
    controller('AppCtrl', function ($scope, $http) {

    }).
    controller('GreetController', function ($scope) {
        // write Ctrl here

    }).
    controller('GuestbookController', function ($scope, $http) {
        //retrieve the button click
        //make a HTTP request to get the JSON data to populate the list.
        $http({
            method: 'GET',
            url: '/api/posts'
        }).
            success(function (data, status, headers, config) {
                $scope.posts = data;
            }).
            error(function (data, status, headers, config) {
                $scope.posts = [{
                    name: 'Error!'
                }];
            });
    }).
    controller('SettingsController', function ($scope) {
        // write Ctrl here

    }).
    controller('SignController', function ($scope, $http) {
        //Painting for the canvas
        var paint = false;
        var context = document.getElementById('signaturePanel').getContext("2d");
        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var color = "#fffff";

        function addClick(x, y, dragging) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }

        $('#signaturePanel').mousedown(function (e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        });
        $('#signaturePanel').mousemove(function (e) {
            if (paint) {
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        });
        $('#signaturePanel').mouseup(function (e) {
            paint = false;
        });
        $('#signaturePanel').mouseleave(function (e) {
            paint = false;
        });
        function redraw() {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

            context.strokeStyle = color;
            context.lineJoin = "round";
            context.lineWidth = 5;

            for (var i = 0; i < clickX.length; i++) {
                context.beginPath();
                if (clickDrag[i] && i) {
                    context.moveTo(clickX[i - 1], clickY[i - 1]);
                } else {
                    context.moveTo(clickX[i] - 1, clickY[i]);
                }
                context.lineTo(clickX[i], clickY[i]);
                context.closePath();
                context.stroke();
            }
        }

        // saving signature + text
        $scope.submitPost = function () {
            //find the dataUrl of the finished canvas object
            var canvas = document.getElementById("signaturePanel");
            var dataUrl = canvas.toDataURL();
            var date = new Date();
            var dateString = date.toDateString();
            //make a http request
            $http({
                method: 'POST',
                url: '/api/posts',
                data: {
                    name: $('#inputName').val(),
                    content: $('#inputContent').val(),
                    date: dateString,
                    imgBase64: dataUrl
                }
            }).success(function (data, status, headers, config) {
                console.log(data);
            }).error(function (data, status, headers, config) {
                console.log(data);
            });
        }
        //clear the canvas
        $scope.clearCanvas = function () {
            clickX.length = 0;
            clickY.length = 0;
            clickDrag.length = 0;
            context.clearRect(0, 0, 500, 200);
        }
    }).
    controller('TwitterController',function($scope, $http){

    });
