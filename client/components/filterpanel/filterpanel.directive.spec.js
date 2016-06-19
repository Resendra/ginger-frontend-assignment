'use strict';

describe('Directive: filterpanel', function() {

    // load the directive's module
    beforeEach(module('gingerApp.filterpanel'));
    beforeEach(module('components/filterpanel/filterpanel.html'));

    var element,
        scope,
        $q,
        $compile,
        isolatedScope,
        Payments,
        Utils;

    beforeEach(inject(function($rootScope, _$q_, _$compile_, _Payments_, _Utils_) {
        $q = _$q_;
        $compile = _$compile_;
        Payments = _Payments_;
        Utils = _Utils_;

        scope = $rootScope.$new();

        scope.filters = {};
    }));

    describe('Retrieving available payment methods', function() {
        it('should attach correct payment methods to scope when the call has successed', function() {
            var data = [{
                'name': 'I-Deal',
                'value': 'ideal'
            }];

            spyOn(Payments, 'getPaymentMethods').and.callFake(function() {
                var deferred = $q.defer();
                deferred.resolve(data);
                return deferred.promise;
            });

            element = angular.element('<ginger-filterpanel filters="filters"></ginger-filterpanel>');
            element = $compile(element)(scope);
            scope.$apply();

            isolatedScope = element.isolateScope();

            expect(isolatedScope.paymentMethods).toEqual(data);
        });

        it('should handle error when the call has failed', function() {
            var error = 'FAIL';

            spyOn(Utils, 'handleError').and.callFake(function() {
                return;
            });

            spyOn(Payments, 'getPaymentMethods').and.callFake(function() {
                var deferred = $q.defer();
                deferred.reject(error);
                return deferred.promise;
            });

            element = angular.element('<ginger-filterpanel filters="filters"></ginger-filterpanel>');
            element = $compile(element)(scope);
            scope.$apply();

            isolatedScope = element.isolateScope();

            expect(Utils.handleError).toHaveBeenCalledWith('Cannot retrieve payment methods: FAIL');
        });
    });

    describe('Clearing filters', function() {
      it('should set filters to an empty object', function() {
        var mockedFilters = {'test': 'test'};

        element = angular.element('<ginger-filterpanel filters="filters"></ginger-filterpanel>');
        element = $compile(element)(scope);
        scope.$apply();

        isolatedScope = element.isolateScope();
        isolatedScope.filters = mockedFilters;

        expect(isolatedScope.filters).toEqual(mockedFilters);
        isolatedScope.clear();
        expect(isolatedScope.filters).toEqual({});
      })
    });
});
