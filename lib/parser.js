/*
 * @author: Hsiaoming Yang
 */


function parse(code) {
  code = code + '\n';
  var lines = code.split(/\r\n|\r|\n/);
  var sections = [];

  var comments = [];
  var inComment = false, section;
  lines.forEach(function(line) {
    // comment block
    if (/^\/\*/.test(line)) {
      inComment = true;
    }
    if (/\*\/$/.test(line)) {
      inComment = false;
      line = line.replace(/\*\/$/, '');
      comments.push(cleanLine(line));
      return;
    }

    if (/^\/\//.test(line)) {
      comments.push(cleanLine(line));
      return;
    }

    if (inComment) {
      comments.push(cleanLine(line));
      return;
    }

    // it is not comment now
    if (comments.length) {
      section = parseSection(comments);
      if (section) {
        sections.push(section);
      }
      // reset storage
      comments = [];
    }
  });
  return sections;
}
module.exports = parse;


function parseSection(lines) {
  var name, title, description = [], modifiers = [], examples = [];

  var parsed, exampleStart, exampleFile;
  lines.forEach(function(line) {
    // example file is the last line of comment
    if (exampleFile) return;

    if (!name && line.trim()) {
      parsed = parseTitle(line);
      if (parsed) {
        name = parsed.name;
        title = parsed.title;
        return;
      }
    }
    if (!name) return;

    // parse modifier
    // :hover - Button when hover
    if (/^((?:\:|\.)[a-zA-Z0-9\:]+)\s+\-\s+(.*)$/.exec(line)) {
      return modifiers.push({name: RegExp.$1, description: RegExp.$2});
    }

    if (/^Examples\:/.test(line.trim())) {
      if (line.trim() === 'Examples:') {
        exampleStart = true;
      } else {
        exampleFile = line.trim().replace(/^Examples\:/, '').trim()
      }
      return;
    }

    if (!exampleStart && /^\s{2,}/.test(line)) {
      exampleStart = true;
    }
    if (exampleStart) {
      examples.push(line);
      return;
    }

    description.push(line);
  });
  if (!name) return null;

  var ret = {name: name, title: title, modifiers: modifiers};

  ret.description = description.join('\n').replace(/^\n*\s*/, '');

  if (exampleFile) {
    ret.exampleFile = exampleFile;
  } else {
    ret.html = formatCode(examples);
    ret.examples = parseExamples(ret.html, modifiers);
  }
  return ret;
}


function cleanLine(line) {
  // clean comment line
  line = line.replace(/^\/\//, '');
  line = line.replace(/^\s*\*/, '');
  line = line.replace(/^\/\*/, '');
  line = line.replace(/\*\/$/, '');
  line = line.replace(/^\s{0,1}/, '');
  return line.trimRight();
}


function parseTitle(line) {
  // the first line can be title
  if (/^(\d+\.\d+)\s+(.*)$/.exec(line)) {
    var name = RegExp.$1;
    var title = RegExp.$2;
    return {name: name, title: title};
  }
  return null;
}

function parseExamples(code, modifiers) {
  // <button class="classy {{modifier}}">Button</button>
  var examples = [];

  // we should have an example without modifier
  examples.push({
    name: '',
    code: code.replace(/\{\{modifier\}\}/g, '')
  });

  if (!modifiers) return examples;

  var name, value;
  modifiers.forEach(function(modifier) {
    name = modifier.name;
    value = code.replace(
      /\{\{modifier\}\}/g,
      name.replace(':', ' pseudo-class-').replace('.', ' ')
    );
    examples.push({name: name, code: value});
  });
  return examples;
}

function formatCode(lines) {
  var indent;
  var codes = [];

  lines.forEach(function(line) {
    if (indent === undefined && line.trim()) {
      var match = line.match(/\S/);
      if (match) {
        indent = new RegExp('^\\s{' + match.index + '}');
      }
    }
    if (!indent) return;
    codes.push(line.replace(indent, ''));
  });
  return codes.join('\n');
}
