const {itBlock} = require('./test-helper');

describe('logical expressions', function () {
  [
    ['TRUE', [
      ['TRUE', 'operand', 'logical']
    ]],
    ['FALSE', [
      ['FALSE', 'operand', 'logical']
    ]],
  ]
  .forEach(itBlock);
});