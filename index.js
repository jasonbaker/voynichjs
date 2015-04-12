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
    return val.match(regex)[5];
  });

  // VOMIT: This is horrendously repetitive, and it seems like some kind of
  // pipeline/monad waiting to happen.
  var fullText = strippedTextLines.join('\n');
  fullText = fullText.split('.').join(' ').replace(/\!/g, '');
  fullText = fullText.replace(/=/g, '\n');
  fullText = fullText.replace(/\{.*\}/g, '');
  fullText = fullText.replace(/-$/, '');
  return fullText.replace(/-/g, ' ');
};

var varsObjDefaults = {
  // Matches any folio
  folio: 'f\\w{1,2}[r|v]',

  // Matches paragraphs
  lineType: 'P\\d?',

  // Matches all lines
  lineIdentifier: '\\d+',

  // Takeshi Takahashi
  transcriber: 'H',

  // Transcript included in bundle
  fname: './voynich.txt'
}

function mergeVarsObj(varsObj) {
  var newObj = util._extend({}, varsObjDefaults);
  return util._extend(newObj, varsObj);
}

function regexBuilder(varsObj) {
  var regexTemplate = '^<({folio})\\.({lineType})\\.({lineIdentifier});({transcriber})>\\s+(.*)$';
  return new RegExp(format(regexTemplate, varsObj));
}
