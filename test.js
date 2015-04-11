var vows = require('vows'),
    assert = require('assert'),
    voynich = require('./index.js');

vows.describe('Voynich').addBatch({
  'Extracts text': {
    topic: function() {
      var txt = voynich.extractText({fname: 'test.txt'});
      console.log(txt);
      return txt;
    },
    'contains the right text': function(topic) {
      assert.equal(topic, 'dao ckhy ckho ckhy shy dksheey cthy kotchody dal')
    }
  }
}).run();