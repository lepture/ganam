exports = module.exports = require('./lib/parser');

var style = require('./lib/style');
exports.style = style.styleFile;
exports.styleSync = style.styleFileSync;
