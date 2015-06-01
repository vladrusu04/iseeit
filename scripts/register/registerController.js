/*jslint newcap: true, browser: true */
/*global angular, iSeeIt*/
iSeeIt.mainApp.controller('RegisterController', ['$scope', '$state',
    function ($scope, $state) {
        'use strict';

        $scope.registerForm = {};

        $scope.register = function () {
            console.log("the user has been register", $scope.user);
        };

        $scope.cancel = function () {
            $state.go('anon.login');
        }
    }]);