/*jslint newcap: true, browser: true */
/*global angular, iSeeIt*/
iSeeIt.mainApp.controller('RegisterController', ['$rootScope', '$scope', '$state',
    function ($rootScope, $scope, $state) {
        'use strict';

        $scope.registerForm = {};
        $scope.user = {};

        /**
         * Method used to register a new user
         */
        $scope.register = function () {
            $scope.submitted = true;
            console.log("the user has been register", $scope.user);
        };

        $scope.setFullRegister = function () {
            $rootScope.fullRegister = true;
        };

        $rootScope.fullRegister = false;

        $scope.cancel = function () {
            $state.go('anon.login');
        };
    }]);