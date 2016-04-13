const meow = requrie('meow');
const tsum = require('..');

const cli = meow(`
  Usage
    $ tsum <url>

  Options
    -b, --branch  Target a branch

  Examples
    $ tsum "git@github.com:totora0155/tsum.git"
`, {
  alias: {
    b: 'branch'
  }
});

console.log(cli);
