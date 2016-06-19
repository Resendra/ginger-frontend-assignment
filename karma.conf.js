module.exports = function(config) {
    config.set({

        basePath: '',

        files: [
            'client/bower_components/angular/angular.js',
            'client/bower_components/angular-mocks/angular-mocks.js',
            'client/bower_components/angular-material/angular-material.js',
            'client/bower_components/angular-animate/angular-animate.js',
            'client/bower_components/angular-aria/angular-aria.js',
            'client/bower_components/angular-ui-router/release/angular-ui-router.js',
            'client/bower_components/angular-ui-grid/ui-grid.js',
            'client/app/app.js',
            'client/app/**/*.js',
            'client/components/**/*.js',
            'client/app/**/*.html',
            'client/components/**/*.html'
        ],

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_ERROR,

        autoWatch: false,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        preprocessors: {
            '**/*.html': 'html2js',
            'client/{app,components}/**/!(*spec|*mock).js': ['coverage']
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'client/'
        },

        reporters: ['spec', 'coverage'],

        coverageReporter: {
            type: 'lcov',
            dir: './coverage',
            file: 'coverage.lcov'
        },

        singleRun: true

    });
};
