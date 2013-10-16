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

        watch: {
            options: {
                livereload: true,
            },
            css: {
                files: ['<%%= yeoman.app %>/assets/scss/*.scss'],
                tasks: ['compass']
            },
            html: {
                files: ['<%%= yeoman.app %>/*.html'],
                tasks: ['copy']
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: '0.0.0.0',
                base: '<%%= yeoman.dev %>'
            },
            livereload: {
                options: {
                    open: 'http://localhost:<%%= connect.options.port %>',
                    base: [
                        '<%%= yeoman.dev %>'
                    ]
                }
            }
        },

        open: {
            server: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },

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
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dev %>/assets/css/fonts'}
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/scss/**', '!**/js/*.js', '!**/bower_components/**'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dist %>/assets/css/fonts'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-legacy', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        return dest + '/jquery-legacy.min.js';
                    }},
                    // Only copy over the minified migrate plugin
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/bower_components/jquery-migrate', src: ['jquery-migrate.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'}
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

/*        uglify: {
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
        },*/

        replace: {
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
                    }]
                },
                files: [
                    {src:  ['app/index.html'], dest: 'app/index.html'}
                ]
            }
        },

        processhtml: {
            options: {
                process: true,
                templateSettings: {
                    opener: '{!',
                    closer: '!}'
                }
            },
            dev: {
                options: {
                    data: {
                        jqMinLocal: 'assets/bower_components/jquery/jquery.min.js',
                        jqLegMinLocal: 'assets/bower_components/jquery-legacy/jquery.min.js',
                        jqMigrate: 'assets/bower_components/jquery-migrate/jquery-migrate.js'
                    }
                },
                files: {
                    '<%%= yeoman.dev %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            },
            dist: {
                options: {
                    data: {
                        jqMinLocal: 'assets/js/lib/jquery.min.js',
                        jqLegMinLocal: 'assets/js/lib/jquery-legacy.min.js',
                        jqMigrate: 'assets/js/lib/jquery-migrate.min.js'
                    }
                },
                files: {
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.app %>/index.html']
                }
            }
        },

        modernizr: {
            'devFile' : '<%%= yeoman.app %>/assets/bower_components/modernizr/modernizr.js',
            'outputFile' : '<%%= yeoman.dist %>/assets/js/lib/modernizr-custom.min.js',
            'files' : ['<%%= yeoman.dist %>/**/*.js', '<%%= yeoman.dist %>/**/*.css', '<%%= yeoman.dist %>/**/*.scss']
        },

        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html'
        },

        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/*.html']
            /*html: ['** /*.html'],
            css: ['** /*.css']*/
        }

    });

    grunt.registerTask('server', function (target) {
        if (target === 'dev') {
            return grunt.task.run(['dev', 'watchit:dev']);
        }

        if (target === 'build') {
            return grunt.task.run(['build', 'watchit:dist']);
        }

        grunt.task.run([
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('watchit', function (type) {
        grunt.config('connect.livereload.options.base', '<%%= yeoman.' + type + ' %>');

        if (type === 'dev') {
            grunt.config('watch.html.tasks', ['copy:' + type, 'replace', 'processhtml:' + type]);
        }
        if (type === 'dist') {
            grunt.config('watch.html.tasks', ['copy:' + type, 'replace', 'modernizr', 'processhtml:' + type, 'useminPrepare', 'concat', 'uglify', 'usemin']);
        }

        grunt.config('watch.css.tasks', 'compass:' + type);
        grunt.task.run('connect:livereload');
        grunt.task.run('watch');
    });

    grunt.registerTask('dev', [
        'clean', 'copy:dev', 'compass:dev', 'replace', 'processhtml:dev'
    ]);

    grunt.registerTask('build', [
        'clean', 'copy:dist', 'compass:dist', 'replace:dist', 'modernizr', 'processhtml:dist', 'useminPrepare', 'concat', 'uglify', 'usemin'
    ]);
};