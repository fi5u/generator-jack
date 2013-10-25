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

    <% if (wordpress === true) { %>
    var yeomanConfig = {
        app: 'app/<%= slugSiteName %>',
        dev: 'dev/<%= slugSiteName %>',
        dist: 'dist/<%= slugSiteName %>'
    };
    <% } %>

    grunt.initConfig({
        yeoman: yeomanConfig,

        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.dev %>/*',
                        '!<%%= yeoman.dev %>/.git*'
                    ]
                }]
            },

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

        useminPrepare: {
            options: {
                dest: '<%%= yeoman.dist %>'
            },
            html: '<%%= yeoman.app %>/index.html',
            css: '<%%= yeoman.app %>/assets/scss/**/*.scss'
        },

        watch: {
            options: {
                livereload: true
            },
            css: {
                files: ['<%%= yeoman.app %>/assets/scss/*.scss'],
                /* TO DO: this should be conditional depending on the framework chosen */
                tasks: ['compass:dev']
            },
            html: {
                files: ['<%%= yeoman.app %>{,*/}*.html'],
                tasks: ['copy:html', 'replace', 'processhtml:dev']
            },
            sprites: {
                files: ['<%%= yeoman.app %>/assets/img/sprite-assets/*.png'],
                tasks: ['spriteHD', 'copy:dev']
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

        copy: {
            dev: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/scss/**', '!.htaccess', '!**/languages/**'], dest: '<%%= yeoman.dev %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dev %>/assets/css/fonts'}<% if (wordpress === true) { %>,
                    {expand: true, cwd: '<%%= yeoman.app %>/languages', src: ['_s.pot'], dest: '<%%= yeoman.dev %>/languages', rename: function (dest) {
                        return dest + '/<%= slugSiteName %>.pot';
                    }}<% } %>
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['**', '!**/img/sprite-assets/**', '!**/scss/**', '!**/js/*.js'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['.htaccess'], dest: '<%%= yeoman.dist %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dist %>/assets/css/fonts'},
                    {expand: true, cwd: 'bower_components/jquery', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'},
                    {expand: true, cwd: 'bower_components/jquery-legacy', src: ['jquery.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib', rename: function (dest) {
                        return dest + '/jquery-legacy.min.js';
                    }},
                    // Only copy over the minified migrate plugin
                    {expand: true, cwd: 'bower_components/jquery-migrate', src: ['jquery-migrate.min.js'], dest: '<%%= yeoman.dist %>/assets/js/lib'}<% if (wordpress === true) { %>,
                    {expand: true, cwd: '<%%= yeoman.app %>/languages', src: ['_s.pot'], dest: '<%%= yeoman.dist %>/languages', rename: function (dest) {
                        return dest + '/<%= slugSiteName %>.pot';
                    }}<% } %>
                ]
            },

            html: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.app %>', src: ['{,*/}*.html'], dest: '<%%= yeoman.dev %>'}
                ]
            }
        },

        <% if (cssFramework === 'compassSusy') { %>
        compass: {
            dev: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    <% if (wordpress === true) { %>
                    cssDir: '<%%= yeoman.dev %>',
                    <% } else { %>
                    cssDir: '<%%= yeoman.dev %>/assets/css',
                    <% } %>
                    environment: 'development'
                }
            },

            dist: {
                options: {
                    sassDir: '<%%= yeoman.app %>/assets/scss',
                    <% if (wordpress === true) { %>
                    cssDir: '<%%= yeoman.dist %>',
                    <% } else { %>
                    cssDir: '<%%= yeoman.dist %>/assets/css',
                    <% } %>
                    environment: 'production'
                }
            }
        },
        <% } %>

        <% if (cssFramework !== 'compassSusy') { %>
        sass: {
            dev: {
                expand: true,
                cwd: '<%%= yeoman.app %>/assets/scss',
                src: ['*.scss'],
                dest: '<%%= yeoman.dev %>/assets/css',
                ext: '.css'
            },

            dist: {
                expand: true,
                cwd: '<%%= yeoman.app %>/assets/scss',
                src: ['*.scss'],
                dest: '<%%= yeoman.dist %>/assets/css',
                ext: '.css'
            }
        },
        <% } %>

        replace: {
            <% if (wordpress === true) { %>
            options: {
                patterns: [{
                    match: '/\'_s\'/g',
                    replacement: function () {
                        return "'<%= slugSiteName %>'";
                    },
                    expression: true
                }, {
                    match: '/_s_/g',
                    replacement: function () {
                        return "<%= slugSiteName %>_";
                    },
                    expression: true
                }, {
                    match: '/ _s/g',
                    replacement: function () {
                        var toCapital = "<%= slugSiteName %>";
                        var capitalized = toCapital.charAt(0).toUpperCase() + toCapital.slice(1);
                        return ' ' + capitalized;
                    },
                    expression: true
                }, {
                    match: '/_s-/g',
                    replacement: function () {
                        return "<%= slugSiteName %>-";
                    },
                    expression: true
                }]
            },

            dev: {
                files: [
                    {expand: true, src: ['<%%= yeoman.dev %>/**']}
                ]
            },

            dist: {
                files: [
                    {expand: true, src: ['<%%= yeoman.dist %>/**']}
                ]
            }
            <% } else { %>
            options: {
                patterns: [{
                    match: '/@jquery-cdn/g',
                    replacement: function () {
                        var jQConf = grunt.file.readJSON('bower_components/jquery/bower.json');
                        return '//ajax.googleapis.com/ajax/libs/jquery/' + jQConf.version + '/jquery.min.js';
                    },
                    expression: true
                }, {
                    match: '/@jquery-legacy-cdn/g',
                    replacement: function () {
                        var jQLegConf = grunt.file.readJSON('bower_components/jquery-legacy/bower.json');
                        return '//ajax.googleapis.com/ajax/libs/jquery/' + jQLegConf.version + '/jquery.min.js';
                    },
                    expression: true
                }]
            },

            dev: {
                files: [
                    {src: ['dev/index.html'], dest: 'dev/index.html'}
                ]
            },

            dist: {
                files: [
                    {src: ['dist/index.html'], dest: 'dist/index.html'}
                ]
            }
            <% } %>
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
                        jqMinLocal: 'bower_components/jquery/jquery.min.js',
                        jqLegMinLocal: 'bower_components/jquery-legacy/jquery.min.js',
                        jqMigrate: 'bower_components/jquery-migrate/jquery-migrate.js'
                    }
                },
                files: {
                    '<%%= yeoman.dev %>/index.html': ['<%%= yeoman.dev %>/index.html']
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
                    '<%%= yeoman.dist %>/index.html': ['<%%= yeoman.dist %>/index.html']
                }
            }
        },

        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/assets/js/lib/modernizr-custom.min.js',
            files: ['<%%= yeoman.dist %>/**/*.js', '<%%= yeoman.dist %>/**/*.css', '<%%= yeoman.dist %>/**/*.scss']
        },

        svgmin: {
            options: {
                plugins: [{
                    removeViewBox: false
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img',
                    src: ['{,*/}*.svg'],
                    dest: '<%%= yeoman.app %>/assets/img/',
                    ext: '.svg'
                }]
            }
        },

        svg2png: {
            dist: {
                files: [
                    { src: ['<%%= yeoman.app %>/assets/img/{,*/}*.svg'] }
                ]
            }
        },

        rev: {
            dist: {
                files: {
                    src: [
                        '<%%= yeoman.dist %>/assets/js/{,*/}*.js',
                        '<%%= yeoman.dist %>/assets/css/{,*/}*.css',
                        '<%%= yeoman.dist %>/assets/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%%= yeoman.dist %>/assets/css/fonts/*'
                    ]
                }
            }
        },

        spriteHD: {
            options: {
                destImg: '<%%= yeoman.app %>/assets/img',
                destCSS: '<%%= yeoman.app %>/assets/scss/global',
                imgUrl: '../img'
            },

            all: {
                src: '<%%= yeoman.app %>/assets/img/sprite-assets/*',
                spriteName: 'sheet'
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%%= yeoman.app %>/assets/img/',
                    src: ['**/*.{png,jpg,jpeg,gif,svg}', '!sprite-assets/*.png'],
                    dest: '<%%= yeoman.app %>/assets/img/'
                }]
            }
        },

        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/*.html'],
            css: '<%%= yeoman.dist %>/assets/css/*.css'
        }
    });

    grunt.registerTask('server', [
        'dev',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'spriteHD',<% if (cssFramework === 'compassSusy') { %>
        'compass:dev',<% } %><% if (cssFramework !== 'compassSusy') { %>
        'sass:dev',<% } %>
        'processhtml:dev',
        'replace:dev'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'svgmin',
        'imagemin:dist',
        'svg2png',
        'spriteHD',<% if (cssFramework === 'compassSusy') { %>
        'compass:dist',<% } %><% if (cssFramework !== 'compassSusy') { %>
        'sass:dist',<% } %>
        'concat',
        'uglify',
        'modernizr',
        'copy:dist',
        'processhtml:dist',
        'replace:dist',
        'rev',
        'usemin',
    ]);
};