const fs = require('fs');
const Git = require('nodegit');
const ora = require('ora');

module.exports = function tsum(repo, flags) {
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
    Git.Clone(formatURL(repo), dirname)
      .then((repo) => {
        spinner.stop();
        console.log(`Cloned into ./${reponame}`);
      })
  });
};

function formatURL(repo) {
  return 'https://github.com/' + repo + '.git';
}
