'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SiteGenerator = module.exports = function SiteGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SiteGenerator, yeoman.generators.Base);

SiteGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [{
        name: 'siteName',
        message: 'What would you like to call your site?'
    }];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;

        cb();
    }.bind(this));
};

SiteGenerator.prototype.app = function app() {
    this.mkdir('app/assets/css/fonts');

    this.mkdir('app/assets/scss/lib');

    this.mkdir('app/assets/img');

    this.mkdir('app/assets/js/lib');

    this.mkdir('app/assets/php');


    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('index.html', 'app/index.html');

    this.template('_bower.json', 'bower.json');
    this.template('_config.json', 'config.json');
    this.template('_package.json', 'package.json');

    this.copy('assets/scss/style.scss', 'app/assets/scss/style.scss');

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

    this.copy('assets/js/variables.js', 'app/assets/js/variables.js');
    this.copy('assets/js/functions.js', 'app/assets/js/functions.js');
    this.copy('assets/js/script.js', 'app/assets/js/script.js');
    this.copy('assets/js/events.js', 'app/assets/js/events.js');
};

SiteGenerator.prototype.runtime = function runtime() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('gitignore', '.gitignore');
};

SiteGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
