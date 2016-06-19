'use strict';

angular.module('gingerApp.main', ['ui.router', 'ngMaterial', 'gingerApp.payments', 'gingerApp.utils', 'gingerApp.filters'])
    .controller('MainCtrl', function($scope, $state, $mdSidenav, Payments, Utils, $filter) {

        var handleError = Utils.handleError;

        $scope.payments = Payments.getPayments();

        Payments.retrieve()
            .then(function(data) {
                $scope.payments = data;
            })
            .catch(function(error) {
                var err = "Could not retrieve payments: " + error;
                handleError(err);
            });

        $scope.filters = {
            'method': []
        };

        $scope.viewMode = 'grid';

        $scope.setViewMode = function(mode) {
            $scope.viewMode = mode;
        };

        $scope.openFilterPanel = function() {
            $mdSidenav('right')
                .toggle();
        };

        $scope.closeFilterPanel = function() {
            $mdSidenav('right')
                .close();
        }

        $scope.doFirstExercise = function() {
            var callback,
                firstExerciseOptions = {
                    'size': 20,
                    'sort': {
                        'property': 'amount',
                        'order': 'DESC'
                    }
                };

            callback = function(error, result) {
                if (error) {
                    handleError(error);
                } else {
                    $scope.payments = result;
                }
            };

            Payments.retrieve(firstExerciseOptions, callback);
        };

        $scope.doSecondExercise = function() {
            var secondExerciseOptions = {
                'filter': {
                    'property': 'merchant',
                    'value': 'Ginger'
                }
            };

            Payments.retrieve(secondExerciseOptions)
                .then(function(data) {
                    $scope.payments = data;
                })
                .catch(function(error) {
                    handleError(error);
                });
        };

        $scope.doThirdExercise = function() {
            Payments.retrieve()
                .then(function(data) {
                    $scope.payments = data;
                    $scope.openFilterPanel();
                })
                .catch(function(error) {
                    handleError(error);
                });
        };

        $scope.doFourthExercise = function() {
            $state.go('main.add');
        };

        $scope.$watch('filters', function(newFilters) {
            $scope.payments = Payments.getPayments();
            angular.forEach(newFilters, function(values, key) {
                $scope.payments = $filter('byProperty')($scope.payments, key, values);
            });

        }, true);

    });
