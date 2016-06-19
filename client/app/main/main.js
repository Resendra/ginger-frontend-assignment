'use strict';

angular.module('gingerApp')
    .config(function($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            })
            .state('main.add', {
                url: 'add',
                controller: 'AddPaymentCtrl',
                onEnter: function($state, $mdDialog) {
                    $mdDialog
                        .show({
                            templateUrl: 'app/main/add-payment/add-payment.html',
                            controller: 'AddPaymentCtrl',
                            clickOutsideToClose: true
                        })
                        .finally(function() {
                            $state.go('^');
                        });
                }
            });
    });
