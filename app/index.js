'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SiteGenerator = module.exports = function SiteGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);
    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function () {
                /*this.copy('assets/bower_components/wordpress/index.php', 'app/index.php');*/
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
        }, /*{
            type: 'confirm',
            name: 'wordpress',
            message: 'Is this site going to be running on WordPress?',
            default: false
        }, */
        {
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

        cb();
    }.bind(this));
};

function convertToSlug(text) {
    return text
        .toLowerCase()
        .replace(/ä+/g, 'a')
        .replace(/ö+/g, 'o')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        ;
}

SiteGenerator.prototype.app = function app() {
    var appUrl = 'app';

    if (this.wordpress) {
        this.slugSiteName = convertToSlug(this.siteName);

        /*this.directory('wordpress', appUrl);*/
        this.directory('_s', '');
        appUrl = '_s';
    }

    this.mkdir(appUrl + '/assets/scss/lib');
    this.mkdir(appUrl + '/assets/scss/fonts');
    this.mkdir(appUrl + '/assets/js/lib');
    this.mkdir(appUrl + '/assets/php');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', appUrl + '/index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');
    this.copy('.htaccess', appUrl + '/.htaccess');

    this.copy('assets/img/sprite-assets/trans.png', appUrl + '/assets/img/sprite-assets/trans.png');
    this.copy('assets/scss/style.scss', appUrl + '/assets/scss/style.scss');
    this.copy('assets/scss/lteie8.scss', appUrl + '/assets/scss/lteie8.scss');

    this.copy('assets/scss/lib/_normalize.scss', appUrl + '/assets/scss/lib/_normalize.scss');

    this.copy('assets/scss/global/_fonts.scss', appUrl + '/assets/scss/global/_fonts.scss');
    this.copy('assets/scss/global/_variables.scss', appUrl + '/assets/scss/global/_variables.scss');
    this.copy('assets/scss/global/_functions.scss', appUrl + '/assets/scss/global/_functions.scss');
    this.copy('assets/scss/global/_mixins.scss', appUrl + '/assets/scss/global/_mixins.scss');
    this.copy('assets/scss/global/_framework_media.scss', appUrl + '/assets/scss/global/_framework_media.scss');
    this.copy('assets/scss/global/_framework_nav.scss', appUrl + '/assets/scss/global/_framework_nav.scss');

    this.copy('assets/scss/local/_typography.scss', appUrl + '/assets/scss/local/_typography.scss');
    this.copy('assets/scss/local/_helpers.scss', appUrl + '/assets/scss/local/_helpers.scss');
    this.copy('assets/scss/local/_images.scss', appUrl + '/assets/scss/local/_images.scss');
    this.copy('assets/scss/local/_forms.scss', appUrl + '/assets/scss/local/_forms.scss');
    this.copy('assets/scss/local/_lists.scss', appUrl + '/assets/scss/local/_lists.scss');
    this.copy('assets/scss/local/_local.scss', appUrl + '/assets/scss/local/_local.scss');

    this.copy('assets/js/script.js', appUrl + '/assets/js/script.js');

    if (this.wordpress) {
        this.directory('assets/scss/wordpress', appUrl + '/assets/scss/object');
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
