var SQL = require('./sql.js'),
    fs = require('fs');

var exports = module.exports = function() {
  this.db = new SQL.Database();
  this.run = this.db.run.bind(this.db);
  this.prepare = this.db.prepare.bind(this.db);
};
exports.deps = ['gulpopts'];

exports.prototype.ensureSchema = function() {
  // // This table serves one purpose: to preserve ordering, which isn't
  // // lexicographical.
  // this.db.run('CREATE TABLE pagesorder(id INTEGER PRIMARY KEY, page UNIQUE)');

  // this.db.run(
  //   'CREATE TABLE parseablemeta(page PRIMARY KEY, key, value)');
  // this.db.run(
  //   'CREATE INDEX parseablemeta_keyvalue on parseablemeta(key, value)');

  // this.db.run(
  //   'CREATE TABLE chunkorder(id INTEGER PRIMARY KEY, page, chunklocator)'); 
  // this.db.run(
  //   'CREATE INDEX pagechunk_locator on chunkorder(chunklocator)');

  this.db.run(
    'CREATE TABLE voynichline(id INTEGER PRIMARY KEY, page, chunklocator, linelocator, transcriber, text)');
};

exports.prototype.persist = function() {
  this.db.run('VACUUM');
  var data = this.db.export();
  var buffer = new Buffer(data);
  fs.writeFileSync(this.gulpopts().dbpath, buffer);
};