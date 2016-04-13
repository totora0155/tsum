'use strict';
const mkdirp = require('mkdirp');
const meow = require('meow');
const tsum = require('..');
const low = require('lowdb');
const storage = require('lowdb/file-sync');
const homePath = require('home-path')();

let db;
try {
  db = low(`${homePath}/.tsum/db.json`, {storage});
} catch (e) {
  mkdirp.sync(`${homePath}/.tsum`);
  db = low(`${homePath}/.tsum/db.json`, {storage});
}

const cli = meow(`
  Usage
    $ tsum <url>

  Options
    -b, --branch  Target a branch
    -h, --help    Show help
    -l, --list    Show clones
    -d, --delete  Delete a clone

  Examples
    $ tsum "git@github.com:totora0155/tsum.git"
`, {
  alias: {
    b: 'branch',
    h: 'help',
    l: 'list',
    d: 'delete'
  }
});

if (cli.flags.h || cli.flags.help) {
  console.log(cli.help);
  process.exit(0);
}

if (cli.flags.l || cli.flags.list) {
  db.object.clones.forEach(clone => {
    console.log(`
[${clone.repo}]
  ${clone.path}`.trim());
  });
  process.exit(0);
}

if (cli.flags.d || cli.flags.delete) {
  const repo = cli.flags.d || cli.flags.delete;
  db('clones').remove({repo});
  process.exit(0);
}

if (cli.input[0]) {
  tsum(cli.input[0], cli.flags, db);
}
