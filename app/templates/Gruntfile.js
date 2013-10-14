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
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/scss/**'], dest: '<%%= yeoman.dev %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dev %>/assets/css/fonts'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery', src: ['jquery.min.js'], dest: '<%%= yeoman.dev %>/assets/js/lib', rename: function (dest) {
                        var jQConf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                        return dest + '/jquery-' + jQConf.version + '.min.js';
                    }},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-legacy', src: ['jquery.min.js'], dest: '<%%= yeoman.dev %>/assets/js/lib', rename: function (dest) {
                        var jQLegConf = grunt.file.readJSON('app/assets/bower_components/jquery-legacy/.bower.json');
                        return dest + '/jquery-' + jQLegConf.version + '.min.js';
                    }},
                    // Only copy over the unminified migrate plugin
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-migrate', src: ['jquery-migrate.js'], dest: '<%%= yeoman.dev %>/assets/js/lib', rename: function (dest) {
                        var jqMigConf = grunt.file.readJSON('app/assets/bower_components/jquery-migrate/.bower.json');
                        return dest + '/jquery-migrate-' + jqMigConf.version + '.js';
                    }}
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/scss/**', '!**/js/*.js', '!**/bower_components/**'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dist %>/assets/css/fonts'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        var jQConf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                        return dest + '/jquery-' + jQConf.version + '.min.js';
                    }},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-legacy', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        var jQLegConf = grunt.file.readJSON('app/assets/bower_components/jquery-legacy/.bower.json');
                        return dest + '/jquery-' + jQLegConf.version + '.min.js';
                    }},
                    // Only copy over the minified migrate plugin
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-migrate', src: ['jquery-migrate.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        var jqMigConf = grunt.file.readJSON('app/assets/bower_components/jquery-migrate/.bower.json');
                        return dest + '/jquery-migrate-' + jqMigConf.version + '.min.js';
                    }}
                ]
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

        uglify: {
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
                        '<%%= yeoman.app %>/assets/bower_components/respond/respond.src.js'
                    ]
                }
            }
        },

        replace: {
            dev: {
                options: {
                    patterns: [{
                        match: '/@jquery-migrate-local/g',
                        replacement: function () {
                            var jQMigConf = grunt.file.readJSON('app/assets/bower_components/jquery-migrate/.bower.json');
                            return 'assets/js/lib/jquery-migrate-' + jQMigConf.version + '.js';
                        },
                        expression: true
                    }]
                }
            },

            dist: {
                options: {
                    patterns: [{
                        match: '/@jquery-cdn/g',
                        replacement: function () {
                            var jQConf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                            return '//ajax.googleapis.com/ajax/libs/jquery/' + jQConf.version + '/jquery.min.js';
                        },
                        expression: true
                    }, {
                        match: '/@jquery-legacy-cdn/g',
                        replacement: function () {
                            var jQLegConf = grunt.file.readJSON('app/assets/bower_components/jquery-legacy/bower.json');
                            return '//ajax.googleapis.com/ajax/libs/jquery/' + jQLegConf.version + '/jquery.min.js';
                        },
                        expression: true
                    }, {
                        match: '/@jquery-local/g',
                        replacement: function () {
                            var jQConf = grunt.file.readJSON('app/assets/bower_components/jquery/bower.json');
                            return 'assets/js/lib/jquery-' + jQConf.version + '.min.js';
                        },
                        expression: true
                    }, {
                        match: '/@jquery-legacy-local/g',
                        replacement: function () {
                            var jQLegConf = grunt.file.readJSON('app/assets/bower_components/jquery-legacy/bower.json');
                            return 'assets/js/lib/jquery-' + jQLegConf.version + '.min.js';
                        },
                        expression: true
                    }, {
                        match: '/@jquery-migrate-local/g',
                        replacement: function () {
                            var jQMigConf = grunt.file.readJSON('app/assets/bower_components/jquery-migrate/.bower.json');
                            return 'assets/js/lib/jquery-migrate-' + jQMigConf.version + '.min.js';
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
            dev: {
                files: {
                    '<%%= yeoman.dev %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            },
            dist: {
                options: {
                    data: {
                        message: '.min'
                    }
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            }
        }
    });

    grunt.registerTask('server', []);

    grunt.registerTask('dev', [
        'clean', 'copy:dev', 'compass:dev', 'replace', 'processhtml:dev'
    ]);

    grunt.registerTask('build', [
        'clean', 'copy:dist', 'compass:dist', 'uglify:dist', 'replace:dist', 'processhtml:dist'
    ]);
};