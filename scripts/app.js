/*jslint newcap: true, browser: true */
/*global angular*/
var iSeeIt = {
    /**
     * The access level objects used for routing
     */
    accessLevel : {
        anon: 0,
        user: 1
    }
};

//declare the main angular app
iSeeIt.mainApp = angular.module('iSeeIt', ['ui.router', 'ngMessages', 'ngTouch']);

// Configure app router
iSeeIt.mainApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    "use strict";

    // Anonymous routes
    $stateProvider
        .state('anon', {
            abstract: true,
            templateUrl: 'views/loginView.html',
            data: {
                access: iSeeIt.accessLevel.anon
            }
        })
        .state('anon.login', {
            url: '/login',
            templateUrl: 'views/login/login.html',
            controller: 'LoginController'
        })
        .state('anon.register', {
            url: '/register',
            templateUrl: 'views/register/register.html',
            controller: 'RegisterController'
        });

    // Regular user routes
    $stateProvider
        .state('main', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                access: iSeeIt.accessLevel.user
            }
        })
        .state('main.home', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/dashboard.html',
            controller: 'DashboardController'
        });

    // Force the router to go into the home (root) state
    $urlRouterProvider.otherwise("/dashboard");

}]);

iSeeIt.mainApp.config(['$compileProvider', function ($compileProvider) {
    "use strict";
    //remove the scope annotation - improve performance
    $compileProvider.debugInfoEnabled(false);
}]);

// Initialization code for the main module of the application
iSeeIt.mainApp.run(['$rootScope', 'Auth', '$state', function ($rootScope, Auth, $state) {
    "use strict";

    $rootScope.stateIs = function (state) {
        return $state.is(state);
    };

    //if the user doesn't have the right access level redirect to login
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState) {
        if (!Auth.authorize(toState.data.access)) {
            event.preventDefault();
            $state.go('anon.login');
        }
    });
}]);
