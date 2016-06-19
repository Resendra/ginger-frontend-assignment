'use strict';

angular.module('gingerApp.paymentCard', ['ngMaterial'])
    .directive('gingerPaymentCard', function() {
        return {
            templateUrl: 'components/ui-components/payment-card/payment-card.html',
            restrict: 'E',
            scope: {
                payment: '='
            },
            link: function(scope, elem, attrs) {

            }
        };
    });
