module.exports = function(file) {
  if (process.env.COVERAGE) {
    file = file.replace('/lib/', '/lib-cov/');
  }
  return require(file);
}
