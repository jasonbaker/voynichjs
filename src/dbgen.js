var lineReader = require('line-reader'),
    voynichLine = require('./voynich-line.js');

function Generator() {}
Generator.deps = ['gulpopts', 'foliomodel', 'db']

Generator.prototype.run = function() {
  this.db().ensureSchema();
  var self = this;
  lineReader.eachLine(this.gulpopts().srcpath, function(textLine) {
    var line = new voynichLine.VoynichTextLine(textLine)
    if (line.matches()) {
      self.foliomodel().addTextLine(line);
    } 
  })
  .then(function() {
    self.db().persist(); 
  });
};

module.exports = Generator;