import test from 'ava';
import Tsum from '..';
import data from 'test.json':

const cli = {
  input: [],
  flags: [],
  help: 'help'
};

const tsum = new Tsum(cli);

test('help', t => {
  t.is(tsum.help, 'help');
});

test('list', t => {
  const list = `
[totora0155/tsum]
  path/to/tsum`.trim();
  t.is(tsum.list, list);
});

test('delete', t => {
  tsum.delete('totora0155/tsum');
  t.is(tsum.size, 2);
});

test('reclone', t => {
  tsum.reclone('totora0155/tsum');
  // TODO:
})

test('clone', t => {
  tsum.clone('totora0155/tsum');
  // TODO: 
})
