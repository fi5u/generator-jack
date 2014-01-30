# Jack

A multifunctional [Yeoman](http://yeoman.io) generator.

Option to setup _WordPress_ installation with a barebones theme, or without a CMS.

With options for working with _Compass_ / _Susy_, _Bourbon_ / _Neat_, or with no framework. CSS preprocessing is handled with SASS.


## Getting Started

Once installed:
* `yo jack` to begin generating
* Work on the files within `app` directory
* `grunt dev` to build an easily debuggable dev version
* `grunt build` to build a production version of the site
* `grunt server` work with a _LiveReloading_ dev version of the site, saves update browser automatically (When working with a _WordPress_ installation, first set up a server host pointed to the `dev` directory, then call `grunt server`), must have _LiveReload_ browser plugin installed.

## General

### Spriting
Handles automatic hiDPI spriting. Drop double-size _png_ assets into `app/assets/img/sprite-assets`. Import into scss file with `@include sprite($img1)` where `img1` is the image filename without extension - hiDPI media query automatically generated.

### SVG to PNG
To automatically convert SVGs to PNGs, just place the SVG assets in the `img` directory (or sub-directory), they will be generated during the `grunt build` process. SVG files will be minified.

### Modernizr
Modernizr is included automatically. For the `dev` build the development version of Modernizr is used. Simply use whichever Modernizr tests you like (in your CSS or JavaScript) and then for the `dist` version a custom build of Modernizr will be included that only contains the tests you need.

### Layout
Automatically set up with a sticky footer. Simply define the footer height in `assets/scss/global/_variables.scss`.

### IE8 and Below
Both _respond.js_ and _selectivizr.js_ are conditionally included for Internet Explorer versions 8 and below.

## WordPress Projects
You will be provided with a barebones theme, based on [Underscores Starter Theme](http://underscores.me).

To make any changes to the WordPress config files, edit the files in the `dev` directory. When you `grunt build` the config files from `dev` will be copied over to `build`.

### Language
WordPress will install with the default US English language. However, you will have the option to install the language files for Finnish language. If this option has been selected, to make the Finnish language the primary language, edit the `wp-config` file in the `dev` directory. Uncomment `//define('WPLANG', 'fi');` and comment out (or delete) `define('WPLANG', '');`.

### Database Backup
Your local database running your WordPress installation will be backed up to the folder `dev_db` in your project's root. This will occur on every `dev` build. Backups on the same day will overwrite.


### Plugins
Custom plugins should be placed in `app/plugins` directory. They will automatically be copied over to the correct place for the `dev` and `dist` builds.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
