var expect = require('expect.js');
var require = require('./_require');
var style = require('../lib/style');


describe('styleFile', function() {
  it('style stylus async', function(done) {
    style.styleFile(__dirname + '/cases/one-section.styl', function(data) {
      expect(data.css).to.contain('#d64;');
      expect(data.order).to.equal(1);
      done();
    });
  });

  it('style css async', function(done) {
    style.styleFile(__dirname + '/cases/one-section.css', function(data) {
      expect(data.css).to.contain('#d64;');
      expect(data.order).to.equal(1);
      done();
    });
  });
});


describe('styleFileSync', function() {
  it('style stylus sync', function() {
    var data = style.styleFileSync(__dirname + '/cases/one-section.styl');
    expect(data.css).to.contain('#d64;');
    expect(data.order).to.equal(1);
    expect(data.css).to.contain('pseudo-class');
  });

  it('style css sync', function() {
    var data = style.styleFileSync(__dirname + '/cases/one-section.css');
    expect(data.css).to.contain('#d64;');
    expect(data.order).to.equal(1);
    expect(data.css).to.contain('pseudo-class');
  });
});
