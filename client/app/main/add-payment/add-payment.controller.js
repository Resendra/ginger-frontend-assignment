'use strict';

angular.module('gingerApp.addPayment', ['ngMaterial', 'gingerApp.payments', 'gingerApp.utils'])
    .controller('AddPaymentCtrl', function($scope, $mdDialog, Payments, Utils) {

        $scope.payment = {};

        Payments.getPaymentMethods()
            .then(function(data) {
                $scope.paymentMethods = data;
            })
            .catch(function(error) {
                Utils.handleError(error);
            });

        $scope.ok = function() {
            Payments.add($scope.payment);
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel('cancel');
        };
    });
