const meow = require('meow');
const tsum = require('..');

const cli = meow(`
  Usage
    $ tsum <url>

  Options
    -b, --branch  Target a branch
    -h, --help    Show help

  Examples
    $ tsum "git@github.com:totora0155/tsum.git"
`, {
  alias: {
    b: 'branch',
    h: 'help'
  }
});

if (cli.flags.h || cli.flags.help) {
  console.log(cli.help);
  process.exit(0);
}

if (cli.input[0]) {
  tsum(cli.input[0], cli.flags);
}
