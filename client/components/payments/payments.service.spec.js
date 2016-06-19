'use strict';

describe('Service: payments', function() {

    // load the service's module
    beforeEach(module('gingerApp.payments'));

    // instantiate service
    var Payments,
        $rootScope,
        $httpBackend,
        $q;

    beforeEach(inject(function(_Payments_, _$rootScope_, _$httpBackend_, _$q_) {
        Payments = _Payments_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    describe('retrieving payments', function() {

        it('should return payments', function() {

        });

    });

});
