/*jslint newcap: true, browser: true */
/*global angular, iSeeIt, sessionStorage*/

iSeeIt.mainApp.factory('Auth', ['$rootScope', '$state', function ($rootScope, $state) {
    "use strict";

    var my = {},
        publicMethods,
        clearUser,
        setUser;

    /**
     * Deletes the logged in user object from session storage.
     */
    clearUser = function () {
        $rootScope.user = null;
        sessionStorage.removeItem('logUser');
    };

    /**
     * Method to save the user into session storage
     * @param {Object} user - The user object that will be saved
     * @param {Number} role - The current role for the user
     */
    setUser = function (user, role) {
        if (user && role) {
            user.access = role;
        }
        sessionStorage.setItem('logUser', JSON.stringify(user));
        $rootScope.user = user;
    };

    my = {
        getLogUser : function () {
            var user = sessionStorage.getItem('logUser');
            if (user) {
                return JSON.parse(user);
            }
            return { access: 0 };
        },

        /**
         * Method to verify if the user has the access level for the current state<
         * @param {Number} accessLevel - The accessLevel that the user needs for the state
         * @returns {boolean}
         */
        authorize: function (accessLevel) {
            return accessLevel == my.getLogUser().access;
        },


        /**
         * Method to login a user in application
         * @param email
         * @param password
         * @param successCallback
         * @param errorCallback
         */
        login: function (email, password, successCallback, errorCallback) {
            if (email === "test@test.com" && password === "password") {
                setUser({
                    email: email,
                    name: "test"
                }, iSeeIt.accessLevel.user);

                successCallback();
            } else {
                errorCallback();
            }
        },

        /**
         * Method to logout the user from application<
         */
        logout: function () {
            clearUser();
            $state.go('anon.login');
        }
    };

    // Methods to be exposed.
    publicMethods = {
        authorize: my.authorize,
        isLoggedIn: my.isLoggedIn,
        login: my.login,
        logout: my.logout
    };

    return publicMethods;
}]);
