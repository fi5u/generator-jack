// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        appBase: 'app',
        devBase: 'dev',
        distBase: 'dist',
        <% if (wordpress === true) { %>
        themeUrl: '/wp-content/themes',
        app: 'app/wp-content/themes/<%= siteCamel %>',
        dev: 'dev/wp-content/themes/<%= siteCamel %>',
        dist: 'dist/wp-content/themes/<%= siteCamel %>'
        <% } else { %>
        app: 'app',
        dev: 'dev',
        dist: 'dist'
        <% } %>
    };

    grunt.initConfig({
        yeoman: yeomanConfig,

        autoshot: {
            default_options: {
                options: {
                    path: 'dev',
                    remote: {
                        files: [
                            { src: "http://www.google.com", dest: "google.png" }
                        ]
                    },
                    local: {
                        path: 'dev',
                        port: 9000,
                        files: [
                            { src: "index.php", dest: "screenshot.jpg" }
                        ]
                    },
                    viewport: [
                        '640x960'
                    ]
                },
            },
        },

        clean: {
            dev: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.devBase %>/*',
                        '!<%%= yeoman.devBase %>/.git*'
                    ]
                }]
            },

            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%%= yeoman.distBase %>/*',
                        '!<%%= yeoman.distBase %>/.git*'
                    ]
                }]
            }
        },

        connect: {
            options: {
                port: 9001,
                livereload: 35729,
                hostname: 'localhost',
                base: '<%%= yeoman.devBase %>'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '<%%= yeoman.devBase %>'
                    ]
                }
            }
        },

        <% if (cssFramework === 'compassSusy') { %>compass: {
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
        },<% } %>

        copy: {
            dev: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.appBase %>', src: ['**', '!**/scss/**', '!.htaccess', '!**/languages/**'], dest: '<%%= yeoman.devBase %>'},
                    {expand: true, cwd: '<%%= yeoman.app %>/assets/scss/fonts', src: ['**'], dest: '<%%= yeoman.dev %>/assets/css/fonts'}<% if (wordpress === true) { %>,
                    {expand: true, cwd: '<%%= yeoman.app %>/languages', src: ['_s.pot'], dest: '<%%= yeoman.dev %>/languages', rename: function (dest) {
                        return dest + '/<%= slugSiteName %>.pot';
                    }}<% } %>
                ]
            },

            dist: {
                files: [
                    {expand: true, cwd: '<%%= yeoman.appBase %>', src: ['**', '!**/img/sprite-assets/**', '!**/scss/**', '!**/js/*.js', '!**/languages/**'], dest: '<%%= yeoman.distBase %>'},
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

        modernizr: {
            devFile: 'bower_components/modernizr/modernizr.js',
            outputFile: '<%%= yeoman.dist %>/assets/js/lib/modernizr-custom.min.js',
            files: ['<%%= yeoman.dist %>/**/*.js', '<%%= yeoman.dist %>/**/*.css', '<%%= yeoman.dist %>/**/*.scss']
        },

        open: {
            all: {
                path: 'http://localhost:<%%= connect.options.port %>'
            }
        },
        <% if (wordpress === true) { %>
        php: {
            options: {
                port: 80,
                hostname: 'gendev',
                keepalive: true,
                open: true
            },

            watch: {
            }
        },
        <% } %>
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

        replace: {
            <% if (wordpress === true) { %>
            options: {
                patterns: [{
                    match: '/Text Domain: _s/g',
                    replacement: function () {
                        return 'Text Domain: <%= slugSiteName %>';
                    },
                    expression: true
                }, {
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
                        var lowerCase = "<%= slugSiteName %>";
                        var capitalized = lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
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
                    {expand: true, src: ['<%%= yeoman.dev %>/**', '<%%= yeoman.dev %>/languages/<%= slugSiteName %>.pot']}
                ]
            },

            dist: {
                files: [
                    {expand: true, src: ['<%%= yeoman.dist %>/**', '<%%= yeoman.dist %>/languages/<%= slugSiteName %>.pot']}
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

        <% if (cssFramework !== 'compassSusy') { %>sass: {
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
        },<% } %>

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

        usemin: {
            options: {
                dirs: ['<%%= yeoman.dist %>']
            },
            html: ['<%%= yeoman.dist %>/*.html'],
            css: '<%%= yeoman.dist %>/assets/css/*.css'
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
                livereload: true,
                port: 9001
            },
            css: {
                files: ['<%%= yeoman.app %>/assets/scss/*.scss'],
                <% if (cssFramework === 'compassSusy') { %>
                tasks: ['compass:dev']
                <% } else { %>
                tasks: ['sass:dev']
                <% } %>
            },
            html: {
                files: ['<%%= yeoman.app %>{,*/}*.html'],
                tasks: ['copy:html', 'replace', 'processhtml:dev']
            },
            sprites: {
                files: ['<%%= yeoman.app %>/assets/img/sprite-assets/*.png'],
                tasks: ['spriteHD', 'copy:dev']
            },
            php: {
                files: ['<%%= yeoman.app %>{,*/}*.php'],
                tasks: ['dev']
            }
        }
    });

    grunt.registerTask('screenshot', [
        'dev',
        /*'connect:livereload',*/
        'autoshot'
    ]);

    grunt.registerTask('server', [
        'dev',<% if (wordpress === false) { %>
        'connect:livereload',
        <% } %>'watch'
    ]);

    grunt.registerTask('dev', [
        'clean:dev',
        'copy:dev',
        'spriteHD',<% if (cssFramework === 'compassSusy') { %>
        'compass:dev',<% } else { %>
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
        'compass:dist',<% } else { %>
        'sass:dist',<% } %>
        'concat',
        'uglify',
        'modernizr',
        'copy:dist',
        'processhtml:dist',
        'replace:dist',
        'rev',
        'usemin'
    ]);
};