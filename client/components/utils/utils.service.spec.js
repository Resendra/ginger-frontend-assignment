'use strict';

describe('Service: utils', function() {

    // load the service's module
    beforeEach(module('gingerApp.utils'));

    // instantiate service
    var Utils,
        $mdToast;

    beforeEach(inject(function(_Utils_, _$mdToast_) {
        Utils = _Utils_;
        $mdToast = _$mdToast_;
    }));

    describe('handling errors', function() {

        it('should toast error', function() {

        });

    });

});
