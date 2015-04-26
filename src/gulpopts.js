var minimist = require('minimist'),
    _ = require('lodash');

var exports = module.exports = function() {
  _.assign(this, minimist(process.argv.slice(2), {
    default: {
      dbpath: 'bin/vch.db',
      srcpath: './voynich.txt',
    }
  }));
};
