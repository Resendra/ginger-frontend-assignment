'use strict';

angular.module('gingerApp', [
        'ui.router',
        'ngMaterial',
        'ui.grid',
        'gingerApp.main',
        'gingerApp.addPayment',
        'gingerApp.filterpanel',
        'gingerApp.paymentCard',
        'gingerApp.payments',
        'gingerApp.utils',
        'gingerApp.filters'
    ])
    .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
        $urlRouterProvider
            .otherwise('/');

        $locationProvider.html5Mode(true);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue-grey')
            .accentPalette('grey');
    });
