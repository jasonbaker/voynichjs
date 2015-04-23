var voynichLine = require('../src/voynich-line.js');

describe('VoynichLine', function() {
  var LINE_TEXT = '<f4r.P.9;H>        daiin.ckhochy.tchy.koraiin-{plant}';

  describe('matches', function() {
    it('works for non-matches', function() {
      var line = new voynichLine.VoynichTextLine('# This is a comment');
      expect(line.matches()).toBe(false); 

      // VoynichTextLine should not match "parsable fields"
      line = new voynichLine.VoynichTextLine('<f1r> {}')
      expect(line.matches()).toBe(false);
    });

    it('properly matches folio', function() {
      var line = new voynichLine.VoynichTextLine(LINE_TEXT);
        
      expect(line.matches()).toBe(true);
    });
  });

  it('gives proper folio number', function() {
    var line = new voynichLine.VoynichTextLine(LINE_TEXT);
    expect(line.folio()).toEqual('f4r');
  });

  it('gives proper unit', function() {
    var line = new voynichLine.VoynichTextLine(LINE_TEXT);
    expect(line.unit()).toEqual('P');
  });

  it('gives proper line number', function() {
    var line = new voynichLine.VoynichTextLine(LINE_TEXT);
    expect(line.lineNo()).toEqual('9')
  });
});
