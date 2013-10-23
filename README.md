# generator-site

A generator for [Yeoman](http://yeoman.io).

With options for working with _Compass_ / _Susy_, _Bourbon_ / _Neat_, or with no framework.


## Getting Started

Once installed:
* `yo site` to begin generating
* Work on the files within `app` directory
* `grunt dev` to build an easily debuggable dev version
* `grunt build` to build a production version of the site
* `grunt server` work with a _LiveReloading_ dev version of the site, saves update browser automatically

### Spriting
Handles automatic hiDPI spriting. Drop double-size _png_ assets into `app/assets/img/sprite-assets`. Import into scss file with `@include sprite($img1)` - hiDPI media query automatically generated.

### SVG to PNG
To automatically convert SVGs to PNGs, just place the SVG assets in the `img` directory (or sub-directory), they will be generated during the `grunt build` process. SVG files will be minified.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
