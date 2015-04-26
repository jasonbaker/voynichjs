var REGEX = /^<(f\d+[r|v]\d?)\.(\w+)\.(\d+);([A-Za-z])>\s+(.*)$/;

function VoynichTextLine(line) {
  this.line_ = line;
  this.match_ = line.match(REGEX);
}

VoynichTextLine.prototype.matches = function() {
  return !!this.match_;
};

VoynichTextLine.prototype.folio = function() {
  return this.match_[1];
};

VoynichTextLine.prototype.unit = function() {
  return this.match_[2]; 
};

VoynichTextLine.prototype.lineNo = function() {
  return this.match_[3];
};

VoynichTextLine.prototype.transcriber = function() {
  return this.match_[4];
}

VoynichTextLine.prototype.text = function() {
  return this.match_[5];
}

exports.VoynichTextLine = VoynichTextLine;