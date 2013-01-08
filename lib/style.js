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
      var sections = parser(data);
      if (!sections.length) {
        callback(null);
        return;
      }
      var order = sections[0].name.match(/^(\d+)\./);
      order = parseInt(order[1], 10);

      var css = getCSS(data, filepath, options);
      callback({order: order, filepath: filepath, css: css, sections: sections});
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

  var sections = parser(data);
  if (!sections.length) {
    return null;
  }
  var order = sections[0].name.match(/^(\d+)\./);
  order = parseInt(order[1], 10);

  var css = getCSS(data, filepath, options);
  return {order: order, filepath: filepath, css: css, sections: sections};
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
  } else {
    css = data;
  }
  var pseudos = /(\:hover|\:disabled|\:active|\:visited)/g;
  css += css.replace(pseudos, function(matched) {
    return '.pseudo-class-' + matched.replace(':', '');
  });
  return css;
}
