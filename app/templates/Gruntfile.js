// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dev: 'dev',
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
            dev: {
                cwd: '<%%= yeoman.app %>',
                src: [ '**', '!**/scss/**' ],
                dest: '<%%= yeoman.dev %>',
                expand: true
            },

            dist: {
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
                    cssDir: '<%%= yeoman.dev %>/assets/css',
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

        concat: {
            dist: {
                files: {
                    '<%%= yeoman.dist %>/assets/js/main.js': [
                        '<%%= yeoman.app %>/assets/js/variables.js',
                        '<%%= yeoman.app %>/assets/js/functions.js',
                        '<%%= yeoman.app %>/assets/js/script.js',
                        '<%%= yeoman.app %>/assets/js/event.js'
                    ],
                    '<%%= yeoman.dist %>/assets/js/lteie8.main.js': [
                        '<%%= yeoman.app %>/assets/bower_components/selectivizr/selectivizr.js',
                        '<%%= yeoman.app %>/assets/bower_components/respond/respond.min.js'
                    ]
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
                    {src:  ['app/index.html'], dest: 'app/index.html'}
                ]
            }
        },

        processhtml: {
            options: {
                process: true
            },

            dist: {
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            }
        }
    });

    grunt.registerTask('server', []);

    grunt.registerTask('dev', [
        'clean', 'copy:dev', 'compass:dev', 'replace'
    ]);

    grunt.registerTask('build', [
        'clean', 'copy:dist', 'compass:dist', 'concat:dist', 'replace', 'processhtml:dist'
    ]);
};
