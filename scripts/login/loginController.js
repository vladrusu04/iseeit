/*jslint newcap: true, browser: true */
/*global angular, iSeeIt*/
iSeeIt.mainApp.controller('LoginController', ['$rootScope', '$scope', '$state', 'Auth',
    function ($rootScope, $scope, $state, Auth) {
        'use strict';

        $scope.user = {};
        $rootScope.fullRegister = false;

        /**
         * Method to login the user in the application
         */
        $scope.login = function () {
            Auth.login($scope.user.email, $scope.user.password, function () {
                $state.go('main.home');
                $scope.errorLogin = null;
            }, function () {
                $scope.errorLogin = "The username or the password is incorrect";
            });
        };
    }]);