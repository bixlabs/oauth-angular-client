'use strict';

/**
 * @ngdoc function
 * @name oauth2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the oauth2App
 */
angular.module('oauth2App')
  .controller('MainCtrl', function ($scope) {
    $scope.login=function() {
           	var client_id="1046506418225-dgpu1935ji53o196us39t959oknt7s2h.apps.googleusercontent.com";
           	var scope="email";
           	var redirect_uri="http://localhost:9000/";
           	var response_type="token";
           	var url="https://accounts.google.com/o/oauth2/auth?scope="+scope+"&client_id="+client_id+"&redirect_uri="+redirect_uri+
             	"&response_type="+response_type;
           	window.location.replace(url);
           };
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
