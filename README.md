# Ganam Style

-------------

Ganam style is a style guide render, inspired by [kneath/kss](https://github.com/kneath/kss).
It is written in nodejs, helps web developers to write a style guide.


## Installation

It's easy to install ganam with npm:

```
$ npm install ganam
```

## Syntax

Writing a style (stylus, less, css) that ganam can parse.


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
ganam.style('stylus', function(styleguide) {
});
```

### styleSync

Ganam style a directory synchronously:

```javascript
var ganam = require('ganam');
var styleguide = ganam.styleSync('stylus');
```

## Nico

Ganam style provides a [nico](http://lab.lepture.com/nico/) writer
