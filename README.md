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

It is highly tested, find the [test coverage](http://lab.lepture.com/ganam/coverage).

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

Find more information in the [example guide](https://github.com/lepture/ganam/blob/master/docs/guide).


## Library

### ganam

Parse code and get the sections:

```javascript
var ganam = require('ganam');
var sections = ganam(code);
```

**Sections** is a list of section, a section contains:

```javascript
{
    "name": "1.1",
    "title": "Classy Buttons"
    "description": "Classy buttons is clickable form action buttons,\nit is widely usage in forms.",
    "modifiers": [
        {"name": ":hover", "description": "button when hovered"},
        {"name": ":disabled", "description": "button when disabled"},
        {"name": ".disabled", "description": "the same as :disabled"}
    ],
    "html": "<button class='classy {{modifier}}'>Button</button\n<a class='button-classy {{modifier}}'>Button</a>",
    "examples": [
        {"name": "", "code": "<button class='classy '>Button</button>......"},
        {"name": ":hover", "code": "<button class='classy pseudo-class-hover'>Button</button>......"},
        {"name": ":disabled", "code": "<button class='classy pseudo-class-disabled'>Button</button>......"},
        ...
    ]
}
```


### style

Ganam style a file:

```javascript
var ganam = require('ganam');
ganam.style('./foo.styl', function(styleguide) {
});
```

A **styleguide** is something like:

```javascript
{
    "order": 1,
    "filepath": "./foo.styl",
    "css": "button.classy {.....}",
    "sections": [....]
}
```

### styleSync

Ganam style a file synchronously:

```javascript
var ganam = require('ganam');
var styleguide = ganam.styleSync('./bar.styl');
```

## Nico

We have a live example for you: [styleguide](http://lab.lepture.com/ganam/guide/buttons).
The code of this styleguide is located at: [ganam/docs/guide](https://github.com/lepture/ganam/blob/master/docs/guide).
This styleguide is built with [nico](http://lab.lepture.com/nico/).

Find more information about nico and get nico with:

```
$ npm install nico -g
```

Have a look at the config file [nico.json](https://github.com/lepture/ganam/blob/master/nico.json) of this project, and learn how to use it. BTW, you must have `ganam` installed to active `GanamWriter`.
