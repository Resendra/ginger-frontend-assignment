'use strict';

angular.module('gingerApp.payments', ['gingerApp.utils'])
    .factory('Payments', function($http, $q, Utils, $filter) {
        var payments,
            paymentsUrl,
            paymentMethods,
            isDefined,
            handleOptionsError,
            getURLWithOptions;

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

        isDefined = angular.isDefined;

        handleOptionsError = function() {
            console.log("Error: you provide wrong options for your payment");
        };

        getURLWithOptions = function(options) {
            var url = angular.copy(paymentsUrl),
                hasOptions = false,
                getPrefix;

            getPrefix = function() {
                if (!hasOptions) {
                    hasOptions = true;
                    return '?';
                } else {
                    return '&';
                }
            };

            if (isDefined(options)) {
                if (isDefined(options.sort)) {
                    if (isDefined(options.sort.property)) {
                        url = url.concat(getPrefix(), '_sort=', options.sort.property);

                        if (isDefined(options.sort.order) && (options.sort.order === 'DESC' || options.sort.order === 'ASC')) {
                            url = url.concat('&_order=', options.sort.order);
                        }
                    } else {
                        handleOptionsError();
                    }
                }

                if (isDefined(options.filter)) {
                    if (isDefined(options.filter.property) && isDefined(options.filter.value)) {
                        url = url.concat(getPrefix(), options.filter.property, '=', options.filter.value);
                    } else {
                        handleOptionsError();
                    }
                }

                if (isDefined(options.size)) {
                    url = url.concat(getPrefix(), '_limit=', options.size);
                }
            }

            return url;
        };

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

                url = getURLWithOptions(options);

                $http.get(url)
                    .success(function(data) {
                        payments = data;
                        cb(null, data);
                        deferred.resolve(data);
                    })
                    .error(function(error) {
                        cb(error, data);
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
