module.exports = function(config) {
    config.set({
        basePath: '../../..',
        frameworks: ['browserify', 'jasmine'],
        files: [
            'src/main/resources/static/js/app.bundle.js',
            'src/test/javascript/**/*.js'
            //'node_modules/angular/angular.js',
            //'node_modules/angular-mocks/angular-mocks.js'
        ],
        //browserify: {
        //    files: [
        //        'src/test/javascript/**/*.js'
        //    ],
        //    debug: true
        //},
        preprocessors: {
            'src/test/javascript/**/**.js': ['browserify']
        },
        exclude: ['src/test/javascript/karma.conf*.js'],
        reporters: ['progress'],
        port: 9876,
        logLevel: 'info',
        browsers: ['PhantomJS'],
        singleRun: false,
        autoWatch: true,
        plugins: [
            'karma-browserify',
            'karma-jasmine',
            'karma-phantomjs-launcher'
        ]
    });
};
