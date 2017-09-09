const {itBlock} = require('./test-helper');

describe('functions', function () {
  [
    ['TODAY()', [
      ['TODAY', 'function', 'start'],
      ['', 'function', 'stop']
    ]],
    ['SUM(1)', [
      ['SUM', 'function', 'start'],
      ['1', 'operand', 'number'],
      ['', 'function', 'stop']
    ]],
    ['@SUM(1)', [
      ['SUM', 'function', 'start'],
      ['1', 'operand', 'number'],
      ['', 'function', 'stop']
    ]],
    ['SUM(1, 2)', [
      ['SUM', 'function', 'start'],
      ['1', 'operand', 'number'],
      [',', 'argument', ''],
      ['2', 'operand', 'number'],
      ['', 'function', 'stop']
    ]],
    ['SUM(1, SUM(2, 3))', [
      ['SUM', 'function', 'start'],
      ['1', 'operand', 'number'],
      [',', 'argument', ''],
      ['SUM', 'function', 'start'],
      ['2', 'operand', 'number'],
      [',', 'argument', ''],
      ['3', 'operand', 'number'],
      ['', 'function', 'stop'],
      ['', 'function', 'stop']
    ]],
  ]
  .forEach(itBlock);

  describe('i18n', function () {
    describe('de-DE', function () {
      var options = {
        language: 'de-DE'
      };

      [
        ['SUM(1; 2)', [
          ['SUM', 'function', 'start'],
          ['1', 'operand', 'number'],
          [',', 'argument', ''],
          ['2', 'operand', 'number'],
          ['', 'function', 'stop']
        ], options],
        ['SUM(1; SUM(2; 3))', [
          ['SUM', 'function', 'start'],
          ['1', 'operand', 'number'],
          [',', 'argument', ''],
          ['SUM', 'function', 'start'],
          ['2', 'operand', 'number'],
          [',', 'argument', ''],
          ['3', 'operand', 'number'],
          ['', 'function', 'stop'],
          ['', 'function', 'stop']
        ], options],
      ]
      .forEach(itBlock);
    });
  });
});
