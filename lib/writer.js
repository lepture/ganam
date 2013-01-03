var fs = require('fs');
var path = require('path');
var nico = require('nico');
var BaseWriter = nico.BaseWriter;
var style = require('./style');


/* nico.json
 *
 * {
 *   "ganam": {
 *     "source": "./styleguide",
 *     "output": "styleguide",
 *     "options": {
 *       "paths": ["./nib"]
 *     }
 *   },
 *   "writers": [
 *     "ganam/lib/writer.GanamWriter"
 *   ]
 * }
 *
 */

var ganamExt = /\.(styl|css)$/;

exports.GanamWriter = BaseWriter.extend({
  writerName: 'GanamWriter',

  _styleguides: [],
  _template: path.join(__dirname, '_templates', 'styleguide.html'),

  setup: function() {
    var ganam = this.storage.config.ganam || {};
    this._template = ganam.template || this._template;
    var output = ganam.output || path.basename(ganam.source);

    var guides = [];
    fs.readdirSync(ganam.source).forEach(function(file) {
      if (!file.match(ganamExt)) return;
      var guide = style.styleFileSync(path.join(ganam.source, file), ganam.options);
      if (guide.sections.length) {
        guide.file = file;
        guide.name = file.replace(ganamExt, '');
        guide.destination = path.join(output, guide.name + '.html');
        guides.push(guide);
      }
    });
    guides.sort(function(a, b) {
      return parseInt(a.sections[0].name, 10) - parseInt(b.sections[0].name, 10);
    });
    this._styleguides = guides;
  },

  run: function() {
    var self = this;
    self._styleguides.forEach(function(guide) {
      self.render({
        destination: guide.destination,
        params: {
          styleguides: self._styleguides,
          guide: guide
        },
        template: self._template
      });
    });
  }
});
