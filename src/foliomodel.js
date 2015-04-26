var squel = require('squel');

function FolioModelService() {};
FolioModelService.deps = ['db'];

FolioModelService.prototype.addTextLine = function(line) {
  var query = squel.insert()
    .into('voynichline')
    .set('page', line.folio())
    .set('chunklocator', line.unit())
    .set('linelocator', line.lineNo())
    .set('transcriber', line.transcriber())
    .set('text', line.text())
    .toParam();
  this.db().prepare(query.text, query.values).run();
};

module.exports = FolioModelService;
