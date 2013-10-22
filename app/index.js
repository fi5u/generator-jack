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
                /*this.copy('assets/bower_components/susy/sass/_susy.scss', 'app/assets/scss/lib/_susy.scss');*/
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

        cb();
    }.bind(this));
};

SiteGenerator.prototype.app = function app() {
    this.mkdir('app/assets/scss/lib');
    this.mkdir('app/assets/scss/fonts');
    this.mkdir('app/assets/js/lib');
    this.mkdir('app/assets/php');

    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'app/index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');

    this.copy('assets/img/sprite-assets/trans.png', 'app/assets/img/sprite-assets/trans.png');
    this.copy('assets/scss/style.scss', 'app/assets/scss/style.scss');
    this.copy('assets/scss/lteie8.scss', 'app/assets/scss/lteie8.scss');

    this.copy('assets/scss/lib/_normalize.scss', 'app/assets/scss/lib/_normalize.scss');

    this.copy('assets/scss/global/_fonts.scss', 'app/assets/scss/global/_fonts.scss');
    this.copy('assets/scss/global/_variables.scss', 'app/assets/scss/global/_variables.scss');
    this.copy('assets/scss/global/_functions.scss', 'app/assets/scss/global/_functions.scss');
    this.copy('assets/scss/global/_mixins.scss', 'app/assets/scss/global/_mixins.scss');
    this.copy('assets/scss/global/_framework_media.scss', 'app/assets/scss/global/_framework_media.scss');
    this.copy('assets/scss/global/_framework_nav.scss', 'app/assets/scss/global/_framework_nav.scss');

    this.copy('assets/scss/local/_typography.scss', 'app/assets/scss/local/_typography.scss');
    this.copy('assets/scss/local/_helpers.scss', 'app/assets/scss/local/_helpers.scss');
    this.copy('assets/scss/local/_images.scss', 'app/assets/scss/local/_images.scss');
    this.copy('assets/scss/local/_forms.scss', 'app/assets/scss/local/_forms.scss');
    this.copy('assets/scss/local/_lists.scss', 'app/assets/scss/local/_lists.scss');
    this.copy('assets/scss/local/_local.scss', 'app/assets/scss/local/_local.scss');

    this.copy('assets/scss/object/_page_header.scss', 'app/assets/scss/object/_page_header.scss');
    this.copy('assets/scss/object/_header_nav.scss', 'app/assets/scss/object/_header_nav.scss');
    this.copy('assets/scss/object/_page_footer.scss', 'app/assets/scss/object/_page_footer.scss');

    this.copy('assets/js/script.js', 'app/assets/js/script.js');
};

SiteGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
    this.copy('.htaccess', 'app/.htaccess');
};

SiteGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
