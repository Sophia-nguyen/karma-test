module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['jasmine'],

        files: [
            // paths loaded by Karma
            {pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: true},
            {pattern: 'node_modules/systemjs/dist/system-polyfills.src.js', included: true, watched: true},
            {pattern: 'node_modules/angular2/bundles/angular2.dev.js', included: true, watched: true},
            {pattern: 'node_modules/angular2/bundles/testing.dev.js', included: true, watched: true},
            {pattern: 'karma-test-shim.js', included: true, watched: true},
            {pattern: 'test/matchers.js', included: true, watched: true},

            //{pattern: 'node_modules/angular2/**/*.dev.js', included: true, watched: true},

            // paths loaded via module imports
            {pattern: 'dist/**/*.js', included: false, watched: true},
            {pattern: 'dist/**/*.js.map', included: false, watched: true},

            // paths loaded via Angular's component compiler
            // (these paths need to be rewritten, see proxies section)
            {pattern: 'src/**/*.html', included: false, watched: true},
            {pattern: 'src/**/*.css', included: false, watched: true},
            {pattern: 'src/**/*.ts', included: false, watched: false},

            // paths loaded via module imports
            {pattern: 'test/**/*.js', included: true, watched: true},
            {pattern: 'test/**/*.js.map', included: false, watched: true},
            {pattern: 'test/**/*.ts', included: false, watched: true}
        ],

        // proxied base paths
        proxies: {
            // required for component assests fetched by Angular's compiler
            "/src/": "/base/dist/"
        },

        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false
    })
};