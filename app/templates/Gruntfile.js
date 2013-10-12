// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dist %>/*',
                        '!<%%= yeoman.dist %>/.git*'
                    ]
                }]
            }
        },

        copy: {
            build: {
                cwd: '<%%= yeoman.app %>',
                src: [ '**', '!**/scss/**' ],
                dest: '<%%= yeoman.dist %>',
                expand: true
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    cssDir: '<%%= yeoman.dist %>/assets/css',
                    environment: 'development'
                }
            },

            dist: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    cssDir: '<%%= yeoman.dist %>/assets/css',
                    environment: 'production'
                }
            }
        },

        replace: {
            dist: {
                options: {
                    patterns: [{
                        match: '/@jquerycdn/g',
                        replacement: function () {
                            var jQconf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                            return '//ajax.googleapis.com/ajax/libs/jquery/' + jQconf.version + '/jquery.min.js';
                        },
                        expression: true
                    }]
                },
                files: [
                    {src:  ['app/index.html'], dest: 'dist/index.html'}
                ]
            }
        }

    });

    grunt.registerTask('server', []);

    grunt.registerTask('dev', [
        'clean', 'copy', 'compass:dev', 'replace'
    ]);

    grunt.registerTask('build', [
        'clean', 'copy', 'compass:dist', 'replace'
    ]);
};
