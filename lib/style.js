var fs = require('fs');
var path = require('path');
var parser = require('./parser');


function styleFile(filepath, options, callback) {
  var encoding = 'utf8';
  if (!callback) {
    callback = options;
  } else {
    encoding = options.encoding || 'utf8';
  }
  fs.readFile(filepath, encoding, function(err, data) {
    if (err) throw err;
    if (callback) {
      var sections = parser.parse(data);
      var css = getCSS(data, filepath, options);
      callback({filepath: filepath, css: css, sections: sections});
    }
  });
}
exports.styleFile = styleFile;

function styleFileSync(filepath, options) {
  var encoding;
  if (!options) {
    encoding = 'utf8';
  } else {
    encoding = options.encoding || 'utf8';
  }
  var data = fs.readFileSync(filepath, encoding);
  var sections = parser.parse(data);
  var css = getCSS(data, filepath, options);
  return {filepath: filepath, css: css, sections: sections};
}
exports.styleFileSync = styleFileSync;


function getCSS(data, filepath, options) {
  options = options || {};
  var ext = path.extname(filepath);
  if (ext === '.styl') {
    var stylus = require('stylus'), css;
    var ret = stylus(data);
    ret.set('filename', path.basename(filepath));
    Object.keys(options).forEach(function(key) {
      ret.set(key, options[key]);
    });
    ret.render(function(err, out) {
      if (err) throw err;
      css = out;
    });
    return css;
  }
  return data;
}
