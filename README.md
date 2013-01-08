# Ganam Style

-------------

[![building status](https://secure.travis-ci.org/lepture/ganam.png?branch=master)](https://travis-ci.org/lepture/ganam)


Ganam style is a style guide render, inspired by [kneath/kss](https://github.com/kneath/kss).
It is written in nodejs, helps web developers to write a style guide.


## Installation

It's easy to install ganam with npm:

```
$ npm install ganam
```

## Syntax

Writing a style (stylus, css) that ganam can parse. A basic overview:

```css
/*
1.1 Classy Buttons

Classy buttons is clickable form action buttons,
it is widely usage in forms.

:hover - button when hovered
:disabled - button when disabled
.disabled - the same as :disabled

Examples:

    <button class="classy {{modifier}}">Button</button
    <a class="button-classy {{modifier}}">Button</a>
*/

button.classy,
a.button-classy {
  color: #d64;
}
button.classy:hover {
  color: #000;
}
```


## Library

### ganam

Parse code and get the sections:

```javascript
var ganam = require('ganam');
var sections = ganam(code);
```

### style

Ganam style a directory:

```javascript
var ganam = require('ganam');
ganam.style('./foo.styl', function(styleguide) {
});
```

### styleSync

Ganam style a directory synchronously:

```javascript
var ganam = require('ganam');
var styleguide = ganam.styleSync('./bar.styl');
```
