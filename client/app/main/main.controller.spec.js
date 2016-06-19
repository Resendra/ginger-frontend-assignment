'use strict';

describe('Controller: MainCtrl', function() {

	// load the controller's module
	beforeEach(module('gingerApp'));

    var MainCtrl, scope, sources;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));

    describe('Test main controller', function(){

    });
});
