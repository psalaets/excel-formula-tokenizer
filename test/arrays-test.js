const { itBlock } = require('./test-helper');

describe('arrays', function () {
  [
    [
      '{1.1,2.1,3.1}',
      [
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        [',', 'argument', ''],
        ['2.1', 'operand', 'number'],
        [',', 'argument', ''],
        ['3.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop']
      ]
    ],
    [
      '{1.1;2.1;3.1}',
      [
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [',', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['2.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [',', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['3.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop']
      ]
    ]
  ].forEach(itBlock);

  describe('i18n', function () {
    describe('de-DE', function () {
      var options = {
        language: 'de-DE'
      };

      [
        [
          '{1,1.2,1.3,1}',
          [
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            [',', 'argument', ''],
            ['2.1', 'operand', 'number'],
            [',', 'argument', ''],
            ['3.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop']
          ],
          options
        ],
        [
          '{1,1;2,1;3,1}',
          [
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [',', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['2.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [',', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['3.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop']
          ],
          options
        ]
      ].forEach(itBlock);
    });
  });
});
