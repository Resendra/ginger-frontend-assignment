'use strict';

angular.module('gingerApp.payments', ['gingerApp.utils'])
    .factory('Payments', function($http, $q, Utils, $filter) {
        var payments,
            paymentsUrl,
            paymentMethods,
            handleOptionsError,
            getURLWithOptions;

        payments = [];
        paymentsUrl = 'http://localhost:3000/payments';

        paymentMethods = [{
            'name': 'I-Deal',
            'value': 'ideal'
        }, {
            'name': 'Credit Card',
            'value': 'creditcard'
        }, {
            'name': 'Bank Transfer',
            'value': 'banktransfer'
        }];

        handleOptionsError = Utils.handleOptionsError;

        getURLWithOptions = Utils.getURLWithOptions;

        return {
            getPayments: function() {
                return payments;
            },

            add: function(payment) {
                var deferred = $q.defer(),
                    url = paymentsUrl;

                payment.created = $filter('date')(Date.now(), 'medium');
                payment.status = 'accepted';

                $http.post(url, payment)
                    .success(function(data) {
                        payments.push(data);
                        deferred.resolve(data);
                    })
                    .error(function(error) {
                        var err = 'Error while adding a payment: ' + error;
                        Utils.handleError(err);
                        deferred.reject(err);
                    });

                return deferred.promise;
            },

            retrieve: function(options, callback) {
                var deferred = $q.defer(),
                    cb = callback || angular.noop,
                    url;

                url = getURLWithOptions(options, paymentsUrl);

                $http.get(url)
                    .success(function(data) {
                        payments = data;
                        cb(null, data);
                        deferred.resolve(data);
                    })
                    .error(function(error) {
                        cb(error, []);
                        deferred.reject(error);
                    });

                return deferred.promise;
            },

            getPaymentMethods: function() {
                //  Using a promise so we could retrieve these from backend later
                var deferred = $q.defer();
                deferred.resolve(paymentMethods);
                return deferred.promise;
            }
        };

    });
