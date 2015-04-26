var SQL = require('./sql.js'),
    fs = require('fs');

var exports = module.exports = function() {
  this.db = new SQL.Database();
  this.run = this.db.run.bind(this.db);
  this.prepare = this.db.prepare.bind(this.db);
};
exports.deps = ['gulpopts'];

exports.prototype.ensureSchema = function() {
  this.db.run(
    'CREATE TABLE voynichline(id INTEGER PRIMARY KEY, page, chunklocator, linelocator, transcriber, text)');
};

exports.prototype.persist = function() {
  this.db.run('VACUUM');
  var data = this.db.export();
  var buffer = new Buffer(data);
  fs.writeFileSync(this.gulpopts().dbpath, buffer);
};