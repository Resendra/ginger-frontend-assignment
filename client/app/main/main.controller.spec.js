'use strict';

describe('Controller: MainCtrl', function() {

    // load the controller's module
    beforeEach(module('gingerApp.main'));

    var MainCtrl,
        scope,
        $q,
        Payments,
        Utils,
        mock;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope, _$q_, _Payments_, _Utils_) {
        scope = $rootScope.$new();
        $q = _$q_;
        mock = {
            'mock__mdSidenav': function(component) {
                return {
                    isMock: true,
                    toggle: function() {
                        return $q.when();
                    },
                    close: function() {
                        return $q.when();
                    }
                }
            }
        };

        Payments = _Payments_;
        Utils = _Utils_;

        spyOn(Payments, 'retrieve').and.callFake(function() {
            var deferred = $q.defer();
            deferred.resolve([]);
            return deferred.promise;
        });

        MainCtrl = $controller('MainCtrl', {
            $scope: scope,
            $mdSidenav: mock.mock__mdSidenav
        });

				scope.$apply();
    }));

    describe('Retrieving available payments', function() {
        it('should attach correct payments to scope when the call has successed', inject(function($controller, $rootScope, $timeout) {
            var data = [{
                "id": 1,
                "method": "creditcard",
                "amount": 6167,
                "currency": "GBP",
                "created": "Sun Jul 05 1981 10:40:49 GMT+0200 (CEST)",
                "status": "denied",
                "merchant": "Ginger Ale"
            }, {
                "id": 2,
                "method": "ideal",
                "amount": 3646,
                "currency": "AUD",
                "created": "Sun Jan 23 1994 04:04:00 GMT+0100 (CET)",
                "status": "denied",
                "merchant": "Ginger Ale"
            }];

            Payments.retrieve.and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;
            });

            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });

            $timeout(function() {
							expect(scope.payments).toEqual(data);
						});

        }));

        it('should handle error when the call has failed', inject(function($controller, $rootScope) {
            var error = 'FAIL';

            spyOn(Utils, 'handleError').and.callFake(function() {
                return;
            });

            Payments.retrieve.and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject(error);
                return deferred.promise;
            });

            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
                $scope: scope
            });

            scope.$apply();
            expect(Utils.handleError).toHaveBeenCalledWith('Could not retrieve payments: FAIL');
        }));
    });

    describe('Changing view mode', function() {
        it('should set view mode to "grid"', function() {
            scope.setViewMode('grid');
            expect(scope.viewMode).toEqual('grid');
        });

        it('should set view mode to "grid-list"', function() {
            scope.setViewMode('grid-list');
            expect(scope.viewMode).toEqual('grid-list');
        });
    });

    xdescribe('Toggling filterpanel', function() {
        it('should toggle sidenav when openFilterPanel method is called', function() {
            spyOn(mock, 'mock__mdSidenav');
            scope.openFilterPanel();
            expect(mock.mock__mdSidenav).toHaveBeenCalled();
        });

        it('should close sidenav when closeFilterPanel method is called', function() {
            spyOn(mock, 'mock__mdSidenav');
            scope.closeFilterPanel();
            expect(mock.mock__mdSidenav).toHaveBeenCalled();
        });
    });
});
