module.exports = function (grunt) {
    var environment = grunt.option('env') || 'dev';

    // Project configuration.
    grunt.initConfig({

        /* Watch source code */
        watch: {
            browserify: {
                files: 'assets/js/**/*.js',
                tasks: ['browserify2']
            }
        },

        /* Client JS compilation */
        browserify2: {
            paper: {
                entry: './assets/js/orga-paper.js',
                compile: './js/orga-paper.js'
            },
            jointjs: {
                entry: './assets/js/orga-jointjs.js',
                compile: './js/orga-jointjs.js'
            }
        },

        /* Basic HTTP server */
        connect: {
            dev: {
                options: {
                    port: 3000,
                    base: '',
                    keepalive: true,
                    hostname: ''
                }
            }
        },

        /* Launch multiple task in parallel*/
        concurrent: {
            tasks: ['connect', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        }
    });

    grunt.registerTask('default', ['browserify2', 'concurrent']);

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-browserify2');
};