var expect = require('expect.js');
var style = require('../lib/style');


describe('styleFile', function() {
  it('style async', function(done) {
    style.styleFile(__dirname + '/cases/one-section.styl', function(data) {
      expect(data.css).to.contain('#d64;');
      expect(data.order).to.equal(1);
      done();
    });
  });
});


describe('styleFileSync', function() {
  it('style sync', function() {
    var data = style.styleFileSync(__dirname + '/cases/one-section.styl');
    expect(data.css).to.contain('#d64;');
    expect(data.order).to.equal(1);
  });
});
