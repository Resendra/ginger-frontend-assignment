'use strict';

describe('Directive: payment-card', function() {

    // load the directive's module
    beforeEach(module('gingerApp.paymentCard'));
    beforeEach(module('components/ui-components/payment-card/payment-card.html'));

    var element,
        scope,
        $q,
        $compile,
        isolatedScope;

    beforeEach(inject(function($rootScope, _$q_, _$compile_) {
        $q = _$q_;
        $compile = _$compile_;

        scope = $rootScope.$new();
    }));

    describe('Displaying a payment-card component', function() {
        it('should create a correct payment-card template', function() {
            var paymentElement;
            scope.payment = {
                "id": 1,
                "method": "creditcard",
                "amount": 6167,
                "currency": "GBP",
                "created": "Sun Jul 05 1981 10:40:49 GMT+0200 (CEST)",
                "status": "denied",
                "merchant": "HSBC"
            };

            element = angular.element('<ginger-payment-card payment="payment"></ginger-payment-card>');
            element = $compile(element)(scope);
            scope.$apply();

            paymentElement = element.find('md-card');
            expect(paymentElement[0].innerHTML).toBeDefined();
        });
    });
});
