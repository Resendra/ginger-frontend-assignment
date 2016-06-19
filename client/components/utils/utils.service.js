'use strict';

angular.module('gingerApp.utils', ['ngMaterial'])
    .factory('Utils', function($mdToast) {
        return {

            handleError: function(error) {
                var toast = $mdToast.simple()
                    .textContent(error)
                    .position({
                        'top': true,
                        'right': true
                    });
                $mdToast.show(toast);
            },

            contains: function(collection, item) {
                var hasValue = false;
                angular.forEach(collection, function(value) {
                    if (angular.equals(item, value)) {
                        hasValue = true;
                    }
                });
                return hasValue;
            }
        };
    });
