module.exports = function (grunt) {
    grunt.initConfig({
        jshint: {
            files: ['Gruntfile.js', 'src/main/resources/static/js/**/*.js', 'src/test/javascript/*.js', '!src/main/resources/static/js/app.bundle.js']
        },
        browserify: {
            js: {
                src: 'src/main/resources/static/js/app.js',
                dest: 'src/main/resources/static/js/app.bundle.js'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            js: {
                files: ['<%= jshint.files %>'],
                tasks: ['browserify']
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('dev', ['jshint', 'browserify', 'watch']);
    grunt.registerTask('default', ['jshint', 'browserify']);
};
