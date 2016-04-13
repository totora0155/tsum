'use strict';
const fs = require('fs');
const Git = require('nodegit');
const ora = require('ora');

module.exports = function tsum(repo, flags, db) {
  const matches = repo.match(/\/(.+)$/)
  if (matches === null) {
    throw Error('Please wrote `username/reponame`');
  }

  const reponame = matches[1];
  const dirname = process.cwd() + '/' + reponame;

  fs.stat(dirname, (err) => {
    if (!err) {
      throw Error(`./${reponame} already exists`);
    }

    const spinner = ora({
      text: `Cloning ${repo} ...`,
      color: 'red'
    });

    spinner.start();
    const data = {
      repo,
      path: dirname,
      url: formatURL(repo)
    };
    Git.Clone(data.url, dirname)
      .then((repo) => {
        spinner.stop();

        process.nextTick(() => {
          console.log(`Cloned into ./${reponame}`);
          db('clones').push(data);
        });
      })
  });
};

function formatURL(repo) {
  return 'https://github.com/' + repo + '.git';
}
