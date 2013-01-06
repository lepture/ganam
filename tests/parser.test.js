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
  it('should have one section', function() {
    expect(parser.parse(blockComments)).to.have.length(1);
  });

  it('should be a valid section', function() {
    var section = parser.parse(lineComments)[0];
    expect(section.name).to.equal('1.1');
    expect(section.title).to.equal('Classy Buttons');
    expect(section.description).to.contain('widely');
    expect(section.modifiers).to.have.length(3);
    expect(section.examples).to.have.length(4);
  });
});
