'use strict';

describe('Controller: AddPaymentCtrl', function() {

    // load the controller's module
    beforeEach(module('gingerApp.addPayment'));

    var AddPaymentCtrl,
        scope,
        $q,
        Payments,
        Utils;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$q_, _Payments_, _Utils_) {
        scope = $rootScope.$new();
        $q = _$q_;
        Payments = _Payments_;
        Utils = _Utils_;

        AddPaymentCtrl = $controller('AddPaymentCtrl', {
            $scope: scope
        });
    }));

    describe('Retrieving available payment methods', function() {
        it('should attach correct payment methods to scope when the call has successed', inject(function($controller, $rootScope) {
            var data = [{
                'name': 'I-Deal',
                'value': 'ideal'
            }];

            spyOn(Payments, 'getPaymentMethods').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;
            });

            scope = $rootScope.$new();
            AddPaymentCtrl = $controller('AddPaymentCtrl', {
                $scope: scope
            });

            scope.$apply();
            expect(scope.paymentMethods).toEqual(data);
        }));

        it('should handle error when the call has failed', inject(function($controller, $rootScope) {
            var error = 'FAIL';

            spyOn(Utils, 'handleError').and.callFake(function() {
                return;
            });

            spyOn(Payments, 'getPaymentMethods').and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject(error);
                return deferred.promise;
            });

            scope = $rootScope.$new();
            AddPaymentCtrl = $controller('AddPaymentCtrl', {
                $scope: scope
            });

            scope.$apply();
            expect(Utils.handleError).toHaveBeenCalledWith(error);
        }));
    });

    describe('Adding a payment', function() {
        it('should save the edited payment and close dialog', inject(function($mdDialog) {
            spyOn(Payments, 'add').and.callFake(function() {
                return;
            });
            spyOn($mdDialog, 'hide');

            scope.ok();
            expect(Payments.add).toHaveBeenCalledWith(scope.payment);
            expect($mdDialog.hide).toHaveBeenCalled();
        }));
    });

    describe('Canceling payment creation', function() {
        it('should dismiss current modal', inject(function($mdDialog) {
            spyOn($mdDialog, 'cancel');

            scope.cancel();
            expect($mdDialog.cancel).toHaveBeenCalled();
        }));
    });
});
