/*jslint newcap: true, browser: true */
/*global angular, iSeeIt*/
iSeeIt.mainApp.directive("passwordCheck", function () {
    'use strict';
    return {
        require: "ngModel",
        scope: {
            otherPass: "=passwordCheck"
        },
        link: function (scope, element, attributes, ngModel) {
            ngModel.$validators.passwordCheck = function (modelValue) {
                if (ngModel.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }
                return modelValue === scope.otherPass;
            };

            scope.$watch("otherPass", function() {
                ngModel.$validate();
            });
        }
    };
});