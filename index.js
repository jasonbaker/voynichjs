var fs = require('fs'),
    Q = require('q'),
    format = require('string-template'),
    util = require('util');

exports.extractText = function(varsObj) {
  varsObj = mergeVarsObj(varsObj);
  var regex = regexBuilder(varsObj);
  if (varsObj.verbose) {
    console.log('Using regex: ' + regex);
  }
  // Yes I'm synchronously slurping a text file. Sue me.
  var splitLines = fs.readFileSync(varsObj.fname, {encoding: 'utf8'}).split('\n');
  var selectedLines = splitLines.filter(function(val) {
    return val.search(regex) !== -1;
  });
  var strippedTextLines = selectedLines.map(function(val) {
    var match = val.match(regex);
    var line = processLine(match[5]);
    if (varsObj.filePerFolio) {
      var fname = match[1];
      fs.appendFileSync(varsObj.outFile + '/' + fname + '.txt', line);
    }
    return line;
  });

  return strippedTextLines.join('\n');
};

function processLine(line) {
  return line
    .split('.').join(' ')
    .replace(/=/, '\n')
    .replace(/\{.*\}/g, '')
    .replace(/-$/, '')
    .replace(/-/, ' ')
    .replace(/!|%/g, '');
}

var varsObjDefaults = {
  // Matches any folio
  folio: 'f\\w{1,3}[r|v]\d?',

  // Matches paragraphs
  lineType: 'P\\d?',

  // Matches all lines
  lineIdentifier: '\\d+',

  // Takeshi Takahashi
  transcriber: 'H',

  // File or directory to write output to
  outFile: null,

  // If given, outFile must be a directory. This outputs one file for each
  // folio.
  filePerFolio: false,

  // Transcript included in bundle
  fname: __dirname + '/voynich.txt'
};

function mergeVarsObj(varsObj) {
  var newObj = util._extend({}, varsObjDefaults);
  return util._extend(newObj, varsObj);
}

function regexBuilder(varsObj) {
  var regexTemplate = '^<({folio})\\.({lineType})\\.({lineIdentifier});({transcriber})>\\s+(.*)$';
  return new RegExp(format(regexTemplate, varsObj));
}
