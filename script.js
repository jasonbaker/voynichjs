var voynich = require('./index.js'),
    minimist = require('minimist');

console.log(voynich.extractText(minimist(process.argv.slice(2))));