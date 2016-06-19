'use strict';

describe('Filter: byProperty', function() {

    // load the filter's module
    beforeEach(module('gingerApp.filters'));

    // initialize a new instance of the filter before each test
    var filterByProperty;
    beforeEach(inject(function($filter) {
        filterByProperty = $filter('byProperty');
    }));

    it('should return items matching given values for given property', function() {
        var values = ['Ginger Ale'];

        var items = [{
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

        var expectedResult = [{
            "id": 2,
            "method": "ideal",
            "amount": 3646,
            "currency": "AUD",
            "created": "Sun Jan 23 1994 04:04:00 GMT+0100 (CET)",
            "status": "denied",
            "merchant": "Ginger Ale"
        }];

        var result = filterByProperty(items, 'merchant', values);
        expect(result).toEqual(expectedResult);
    });

});
