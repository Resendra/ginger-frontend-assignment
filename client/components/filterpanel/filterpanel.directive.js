'use strict';

angular.module('gingerApp.filterpanel', [])
    .directive('gingerFilterpanel', function(Payments, Utils, $mdSidenav) {
        return {
            templateUrl: 'components/filterpanel/filterpanel.html',
            restrict: 'E',
            scope: {
                filters: '=',
                close: '&'
            },
            link: function(scope, elem, attrs) {
                scope.paymentMethods = [];

                Payments.getPaymentMethods()
                    .then(function(data) {
                        scope.paymentMethods = data;
                    })
                    .catch(function(error) {
                        var err = "Cannot retrieve payment methods: " + error;
                        Utils.handleError(err);
                    });

                scope.clear = function() {
                    scope.filters = {};
                }
            }
        };
    });
