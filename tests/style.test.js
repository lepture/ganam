var expect = require('expect.js');
var require = require('./_require');
var style = require('../lib/style');


describe('styleFile', function() {
  it('style stylus async', function(done) {
    style.styleFile(__dirname + '/cases/one-section.styl', {encoding: 'utf8'}, function(data) {
      expect(data.css).to.contain('#d64;');
      expect(data.order).to.equal(1);
      done();
    });
  });

  it('style css async', function(done) {
    style.styleFile(__dirname + '/cases/one-section.css', {encoding: 'utf8'}, function(data) {
      expect(data.css).to.contain('#d64;');
      expect(data.order).to.equal(1);
      done();
    });
  });

  it('has no section', function(done) {
    style.styleFile(__dirname + '/cases/null-section.css', function(data) {
      expect(data).to.equal(null);
      done();
    });
  });

  it('can parse included examples', function(done) {
    style.styleFile(__dirname + '/cases/include-example.css', function(data) {
      var example = data.sections[0].examples[0].code;
      expect(example).to.contain('<h1>foo</h1>');
      done();
    });
  });

  it('can parse header', function(done) {
    style.styleFile(__dirname + '/cases/header-section.styl', function(data) {
      console.log(data.header)
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
    var data = style.styleFileSync(__dirname + '/cases/one-section.css', {encoding: 'utf8'});
    expect(data.css).to.contain('#d64;');
    expect(data.order).to.equal(1);
    expect(data.css).to.contain('pseudo-class');
  });

  it('has no section', function() {
    var data = style.styleFileSync(__dirname + '/cases/null-section.css');
    expect(data).to.equal(null);
  });


  it('can parse included examples', function() {
    var data = style.styleFileSync(__dirname + '/cases/include-example.css')
    var example = data.sections[0].examples[0].code;
    expect(example).to.contain('<h1>foo</h1>');
  });
});
