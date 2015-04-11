var fs = require('fs'),
    Q = require('q'),
    format = require('string-template'),
    util = require('util');

var REGEX = /^<f(\w{1,2})[r|v]\.([X|P]\d?)\.?(\d*);H>\s+(.*)$/;
var folios = ['75', '76', '77', '78', '79', '80', '81', '82', '83', '84']

exports.extractText = function(varsObj) {
  varsObj = mergeVarsObj(varsObj);
  var regex = regexBuilder(varsObj);
  // Yes I'm synchronously slurping a text file. Sue me.
  var splitLines = fs.readFileSync(varsObj.fname, {encoding: 'utf8'}).split('\n');
  var selectedLines = splitLines.filter(function(val) { 
    return val.search(regex) !== -1;
  });
  var strippedTextLines = selectedLines.map(function(val) {
    return val.match(regex)[5];
  });
  var fullText = strippedTextLines.join('\n');
  fullText = fullText.split('.').join(' ').replace(/\!/g, '');
  fullText = fullText.replace(/=/g, '\n');
  fullText = fullText.replace(/\{.*\}/g, '');
  fullText = fullText.replace(/-$/, '');
  return fullText.replace(/-/g, ' ');
};

var varsObjDefaults = {
  // Matches any folio
  folio: '\\w{1,2}[r|v]',

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
  var regexTemplate = '^<f({folio})\\.({lineType})\\.({lineIdentifier});({transcriber})>\\s+(.*)$';
  return new RegExp(format(regexTemplate, varsObj));
}
