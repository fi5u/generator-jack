'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/ä+/g, 'a')
        .replace(/ö+/g, 'o')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '_')
        ;
}

function convertToCamel(text) {
    var arr = text.split(' '),
        length = arr.length,
        element = null,
        capitalized = [];
    for (var i = 0; i < length; i++) {
        element = arr[i];
        element.charAt(0).toUpperCase() + element.slice(1);
        capitalized.push(element);
    }
    return capitalized.join('');
}

var SiteGenerator = module.exports = function SiteGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function () {
                if (this.wordpress) {
                    var fs = require('fs-extra'),
                        replace = require('replace'),
                        simpleGit = require('simple-git')(),
                        slugSite = this.slugSiteName,
                        siteName = this.siteName,
                        siteCamel = convertToCamel(siteName),
                        projectDir = process.cwd();

                    simpleGit.clone('https://github.com/WordPress/WordPress.git', projectDir + '/wp-temp', function (err) {
                        if (err) {
                            return console.error(err);
                        } else {
                            fs.copy(projectDir + '/wp-temp', projectDir + '/dev', function(err){
                                if (err) return console.error(err);

                                console.log('WordPress copied successfully');
                                fs.remove(projectDir + '/wp-temp', function(err){
                                    if (err) return console.error("Temporary WordPress directory - 'wp-temp' could not be removed, you can remove this manually:" + err);
                                });
                                fs.copy(__dirname + '/templates/_s', projectDir + '/app/' + siteCamel, function (err) {
                                    function performReplacement(regex, replacement, paths, include) {
                                        console.log('Replacing ' + regex + ' for ' + replacement);
                                        replace({
                                            regex: regex,
                                            replacement: replacement,
                                            paths: [paths],
                                            include: include,
                                            recursive: true,
                                            count: true
                                        });
                                    }

                                    if (err) {
                                        return console.error(err);
                                    } else {
                                        var mv = require('mv'),
                                            wpThemeDir = projectDir + '/app/' + siteCamel,
                                            wpAssetsDir = wpThemeDir + '/assets';

                                        console.log('Template WordPress theme copied successfully\nBeginning text replacement on theme files');

                                        performReplacement('Text Domain: _s', 'Text Domain: ' + slugSite, wpThemeDir, '*.scss');
                                        performReplacement("'_s'", "'" + slugSite + "'", wpThemeDir);
                                        performReplacement('_s_', slugSite + '_', wpThemeDir);
                                        performReplacement(' _s', ' ' + siteCamel.charAt(0).toUpperCase() + siteCamel.slice(1), wpThemeDir);
                                        performReplacement('_s-', slugSite + '-', wpThemeDir);

                                        console.log('Setting the name for the language file');
                                        mv(wpThemeDir + '/languages/_s.pot', wpThemeDir + '/languages/' + slugSite + '.pot', function(err) {
                                            if (err) {
                                                console.log('Could not set the name for the language file: ' + err);
                                            }
                                        });
                                    }
                                });

                            });
                        }
                    });

                }

            }.bind(this)
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SiteGenerator, yeoman.generators.Base);

SiteGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            name: 'siteName',
            message: 'What would you like to call your site?'
        }, {
            type: 'confirm',
            name: 'wordpress',
            message: 'Is this site going to be running on WordPress?',
            default: false
        }, {
            name: 'dbName',
            message: 'What is the database name?',
            default: 'wordpress',
            when: function (props) {
                return props.wordpress;
            }
        }, {
            name: 'dbUsername',
            message: 'What is the username for the database?',
            default: 'root',
            when: function (props) {
                return props.wordpress;
            }
        }, {
            name: 'dbPassword',
            message: 'What is the password for the database',
            default: 'root',
            when: function (props) {
              return props.wordpress;
            }
        }, {
            name: 'dbHost',
            message: 'What is the host for the database',
            default: 'localhost',
            when: function (props) {
              return props.wordpress;
            }
        }, {
            name: 'dbTablePrefix',
            message: 'What is the table prefix',
            default: 'wp_',
            when: function (props) {
              return props.wordpress;
            }
        }, {
            type: 'list',
            name: 'cssFramework',
            message: 'Which CSS framework / grid system would you like to use?',
            choices: [{
                name: 'Compass/Susy',
                value: 'compassSusy'
            }, {
                name: 'Bourbon/Neat',
                value: 'bourbonNeat'
            }, {
                name: 'No framework',
                value: 'noFramework'
            }]
        }
    ];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;
        this.cssFramework = props.cssFramework;
        this.wordpress = props.wordpress;
        this.dbName = props.dbName;
        this.dbUsername = props.dbUsername;
        this.dbPassword = props.dbPassword;
        this.dbHost = props.dbHost;
        this.dbTablePrefix = props.dbTablePrefix;

        cb();
    }.bind(this));
};

SiteGenerator.prototype.app = function app() {
    function randomString() {
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz@*{}[]()<>#,.;:+=-_%`~!?|";
        var string_length = 64;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    var appUrl = 'app';
    var devUrl = 'dev';

    if (this.wordpress) {
        this.siteCamel = convertToCamel(this.siteName);
        this.slugSiteName = convertToSlug(this.siteName);
        appUrl = 'app/' + this.siteCamel;

        this.rand1 = randomString();
        this.rand2 = randomString();
        this.rand3 = randomString();
        this.rand4 = randomString();
        this.rand5 = randomString();
        this.rand6 = randomString();
        this.rand7 = randomString();
        this.rand8 = randomString();
    }

    this.mkdir(appUrl + '/assets/scss/lib');
    this.mkdir(appUrl + '/assets/scss/fonts');
    this.mkdir(appUrl + '/assets/js/lib');
    this.mkdir(appUrl + '/assets/php');
    this.directory('assets/img', appUrl + '/assets/img');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', appUrl + '/index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    this.copy('.htaccess', appUrl + '/.htaccess');

    this.copy('assets/img/sprite-assets/trans.png', appUrl + '/assets/img/sprite-assets/trans.png');
    this.template('assets/scss/style.scss', appUrl + '/assets/scss/style.scss');

    if (this.wordpress) {
        this.copy('assets/scss/wp_style.css', appUrl + '/style.css');
        this.copy('assets/scss/editor-style.scss', appUrl + '/assets/scss/editor-style.scss');
        this.copy('backgroundsize.min.htc', devUrl + '/backgroundsize.min.htc');
    } else {
        this.copy('backgroundsize.min.htc', appUrl + '/backgroundsize.min.htc');
    }
    this.copy('assets/scss/lteie8.scss', appUrl + '/assets/scss/lteie8.scss');

    this.copy('assets/scss/lib/_normalize.scss', appUrl + '/assets/scss/lib/_normalize.scss');

    this.directory('assets/scss/global', appUrl + '/assets/scss/global');
/*    this.copy('assets/scss/global/_fonts.scss', appUrl + '/assets/scss/global/_fonts.scss');
    this.copy('assets/scss/global/_variables.scss', appUrl + '/assets/scss/global/_variables.scss');
    this.copy('assets/scss/global/_functions.scss', appUrl + '/assets/scss/global/_functions.scss');
    this.copy('assets/scss/global/_mixins.scss', appUrl + '/assets/scss/global/_mixins.scss');
    this.copy('assets/scss/global/_framework_media.scss', appUrl + '/assets/scss/global/_framework_media.scss');
    this.copy('assets/scss/global/_framework_nav.scss', appUrl + '/assets/scss/global/_framework_nav.scss');
*/
    this.directory('assets/scss/local', appUrl + '/assets/scss/local');

/*    this.copy('assets/scss/local/_typography.scss', appUrl + '/assets/scss/local/_typography.scss');
    this.copy('assets/scss/local/_helpers.scss', appUrl + '/assets/scss/local/_helpers.scss');
    this.copy('assets/scss/local/_images.scss', appUrl + '/assets/scss/local/_images.scss');
    this.copy('assets/scss/local/_forms.scss', appUrl + '/assets/scss/local/_forms.scss');
    this.copy('assets/scss/local/_lists.scss', appUrl + '/assets/scss/local/_lists.scss');
    this.copy('assets/scss/local/_local.scss', appUrl + '/assets/scss/local/_local.scss');

*/
    this.copy('assets/js/script.js', appUrl + '/assets/js/script.js');
    this.copy('assets/js/options.js', appUrl + '/assets/js/options.js');


    if (this.wordpress) {
        this.directory('assets/scss/wordpress', appUrl + '/assets/scss/object');
        this.template('wp-config.php', 'dev/wp-config.php');

    } else {
        this.directory('assets/scss/object', appUrl + '/assets/scss/object');
    }
};

SiteGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};

SiteGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
