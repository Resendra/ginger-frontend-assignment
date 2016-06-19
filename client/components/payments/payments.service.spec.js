'use strict';

describe('Service: payments', function() {

    // load the service's module
    beforeEach(module('gingerApp.payments'));

    // instantiate service
    var Payments,
        $rootScope,
        $httpBackend,
        $q,
        paymentsAPIRequest,
        addPaymentAPIRequest;

    beforeEach(inject(function(_Payments_, _$rootScope_, _$httpBackend_, _$q_) {
        Payments = _Payments_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;

        paymentsAPIRequest = $httpBackend.whenGET('http://localhost:3000/payments');
        addPaymentAPIRequest = $httpBackend.whenPOST('http://localhost:3000/payments');
    }));

    describe('Getting payments', function() {

        it('should return cached payments', function() {
            var result,
                payments = [{
                    "id": 1,
                    "method": "creditcard",
                    "amount": 6167,
                    "currency": "GBP",
                    "created": "Sun Jul 05 1981 10:40:49 GMT+0200 (CEST)",
                    "status": "denied",
                    "merchant": "HSBC"
                }, {
                    "id": 2,
                    "method": "ideal",
                    "amount": 3646,
                    "currency": "AUD",
                    "created": "Sun Jan 23 1994 04:04:00 GMT+0100 (CET)",
                    "status": "denied",
                    "merchant": "Ginger Ale"
                }];

            result = Payments.getPayments();
            expect(result).toEqual([]);

            paymentsAPIRequest.respond(200, payments);
            Payments.retrieve();

            $httpBackend.flush();
            result = Payments.getPayments();
            expect(result).toEqual(payments);
        });
    });

    describe('Getting payment methods', function() {
        it('should return payment methods', function() {
            var result = [{
                'name': 'I-Deal',
                'value': 'ideal'
            }, {
                'name': 'Credit Card',
                'value': 'creditcard'
            }, {
                'name': 'Bank Transfer',
                'value': 'banktransfer'
            }];

            Payments.getPaymentMethods()
                .then(function(data) {
                    expect(data).toEqual(result);
                });
            $rootScope.$apply();
        });
    });

    describe('Retrieving payments', function() {

        it('should return payments', function() {
            var payments = [{
                "id": 1,
                "method": "creditcard",
                "amount": 6167,
                "currency": "GBP",
                "created": "Sun Jul 05 1981 10:40:49 GMT+0200 (CEST)",
                "status": "denied",
                "merchant": "HSBC"
            }, {
                "id": 2,
                "method": "ideal",
                "amount": 3646,
                "currency": "AUD",
                "created": "Sun Jan 23 1994 04:04:00 GMT+0100 (CET)",
                "status": "denied",
                "merchant": "Ginger Ale"
            }];

            paymentsAPIRequest.respond(200, payments);
            Payments.retrieve()
                .then(function(data) {
                    expect(data).toEqual(payments);
                });
            $httpBackend.flush();
        });

        it('should handle request failure', function() {
            var error = 'FAIL';
            paymentsAPIRequest.respond(404, error);
            Payments.retrieve()
                .catch(function(err) {
                    expect(err).toEqual(error);
                });
            $httpBackend.flush();
        });

    });

    describe('Adding payment', function() {

        it('should add payment and return a valid payment', function() {
            var result,
                payment = {
                    "method": "creditcard",
                    "amount": 6167,
                    "currency": "GBP",
                    "status": "denied",
                    "merchant": "HSBC"
                };

            result = angular.copy(payment);
            result.id = 1;
            result.created = 'Sun Jul 05 1981 10:40:49 GMT+0200 (CEST)';

            addPaymentAPIRequest.respond(200, result);
            Payments.add(payment)
                .then(function(data) {
                    expect(data).toEqual(result);
                });
            $httpBackend.flush();
        });

        it('should handle request failure', function() {
            var error = 'FAIL',
                payment = {
                    "method": "creditcard",
                    "amount": 6167,
                    "currency": "GBP",
                    "status": "denied",
                    "merchant": "HSBC"
                };

            addPaymentAPIRequest.respond(404, error);
            Payments.add(payment)
                .catch(function(err) {
                    expect(err).toEqual('Error while adding a payment: ' + error);
                });
            $httpBackend.flush();
        });
    });

});
