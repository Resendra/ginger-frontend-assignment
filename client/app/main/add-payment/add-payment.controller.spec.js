'use strict';

describe('Controller: AddPaymentCtrl', function() {

    // load the controller's module
    beforeEach(module('gingerApp'));

    var AddPaymentCtrl, scope, Payments;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _Payments_) {
        scope = $rootScope.$new();

        Payments = _Payments_;

        AddPaymentCtrl = $controller('AddPaymentCtrl', {
            $scope: scope
        });
    }));

    describe('Adding a payment', function() {
        it('should save the edited payment and close dialog', inject(function($mdDialog) {

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
