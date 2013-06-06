var expect = require('expect.js');
var require = require('./_require');
var parser = require('../lib/parser');

var lineComments = [
  '// 1.1 Classy Buttons',
  '//',
  '// Classy buttons is clickable form action buttons,',
  '// it is widely usage in forms.',
  '//',
  '// :hover - button when hovered',
  '// :disabled - button when disabled',
  '// .disabled - the same as :disabled',
  '//',
  '// Examples:',
  '//   <button class="classy {{modifier}}">Button</button',
  '//   <a class="button-classy {{modifier}}">Button</a>'
].join('\n');

var blockComments = [
  '/* 1.1 Classy Buttons',
  '',
  ' Classy buttons is clickable form action buttons,',
  '* it is widely usage in forms.',
  '',
  ' :hover - button when hovered',
  ' :disabled - button when disabled',
  ' .disabled - the same as :disabled',
  '',
  ' Examples:',
  '   <button class="classy {{modifier}}">Button</button',
  '   <a class="button-classy {{modifier}}">Button</a>*/'
].join('\n');


describe('parse', function() {
  it('can no sections', function() {
    var ret = parser('// foo');
    expect(ret.header).to.equal('foo');
    expect(ret.sections).to.have.length(0);
  });

  it('should have one section', function() {
    expect(parser(blockComments).sections).to.have.length(1);
  });

  it('should be a valid section', function() {
    var section = parser(blockComments).sections[0];
    expect(section.name).to.equal('1.1');
    expect(section.title).to.equal('Classy Buttons');
    expect(section.description).to.contain('widely');
    expect(section.modifiers).to.have.length(3);
    expect(section.examples).to.have.length(4);
  });

  it('should be a valid section without `Examples:`', function() {
    var comments = blockComments.replace('Examples:\n', '');
    var section = parser(comments).sections[0];
    expect(section.name).to.equal('1.1');
    expect(section.title).to.equal('Classy Buttons');
    expect(section.description).to.contain('widely');
    expect(section.modifiers).to.have.length(3);
    expect(section.examples).to.have.length(4);
  });

  it('has an example file', function() {
    var comments = [
      '// 1.1 Classy Buttons',
      '//',
      '// Classy buttons is clickable form action buttons,',
      '// it is widely usage in forms.',
      '//',
      '// Examples: foo/bar.html',
      '//   <button class="classy {{modifier}}">Button</button',
      '//   <a class="button-classy {{modifier}}">Button</a>'
    ].join('\n');

    var section = parser(comments).sections[0];
    expect(section.examples).to.not.be.ok();
    expect(section.exampleFile).to.equal('foo/bar.html');
  });
});
