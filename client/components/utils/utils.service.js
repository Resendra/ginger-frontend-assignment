'use strict';

angular.module('gingerApp.utils', ['ngMaterial'])
    .factory('Utils', function($mdToast) {
        var isDefined = angular.isDefined;
        
        return {
            handleOptionsError: function() {
                console.log("Error: you provide wrong options for your payment");
            },

            getURLWithOptions: function(options, distantURL) {
                var url = angular.copy(distantURL),
                    hasOptions = false,
                    getPrefix;

                getPrefix = function() {
                    if (!hasOptions) {
                        hasOptions = true;
                        return '?';
                    } else {
                        return '&';
                    }
                };

                if (isDefined(options)) {
                    if (isDefined(options.sort)) {
                        if (isDefined(options.sort.property)) {
                            url = url.concat(getPrefix(), '_sort=', options.sort.property);

                            if (isDefined(options.sort.order) && (options.sort.order === 'DESC' || options.sort.order === 'ASC')) {
                                url = url.concat('&_order=', options.sort.order);
                            }
                        } else {
                            this.handleOptionsError();
                        }
                    }

                    if (isDefined(options.filter)) {
                        if (isDefined(options.filter.property) && isDefined(options.filter.value)) {
                            url = url.concat(getPrefix(), options.filter.property, '=', options.filter.value);
                        } else {
                            this.handleOptionsError();
                        }
                    }

                    if (isDefined(options.size)) {
                        url = url.concat(getPrefix(), '_limit=', options.size);
                    }
                }

                return url;
            },

            handleError: function(error) {
                var toast = $mdToast.simple()
                    .textContent(error)
                    .position({
                        'top': true,
                        'right': true
                    });
                $mdToast.show(toast);
            },

            contains: function(collection, item) {
                var hasValue = false;
                angular.forEach(collection, function(value) {
                    if (angular.equals(item, value)) {
                        hasValue = true;
                    }
                });
                return hasValue;
            }
        };
    });
