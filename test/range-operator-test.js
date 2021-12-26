const { itBlock } = require('./test-helper');

describe('range operators', function () {
  [
    [
      'A1:C1,A2:C2',
      [
        ['A1:C1', 'operand', 'range'],
        [',', 'operator-infix', 'union'],
        ['A2:C2', 'operand', 'range']
      ]
    ],
    [
      'A1:C1 A2:C2',
      [
        ['A1:C1', 'operand', 'range'],
        [' ', 'operator-infix', 'intersect'],
        ['A2:C2', 'operand', 'range']
      ]
    ],
    // multiple spaces between ranges
    [
      'A1:C1  A2:C2',
      [
        ['A1:C1', 'operand', 'range'],
        [' ', 'operator-infix', 'intersect'],
        ['A2:C2', 'operand', 'range']
      ]
    ],
    [
      '={{1.1,1.2};{1.1,1.2}}',
      [
        ['ARRAY', 'function', 'start'],
        // First Column
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        [',', 'argument', ''],
        ['1.2', 'operand', 'number'],
        ['', 'function', 'stop'],
        ['', 'function', 'stop'],
        ['', 'function', 'stop'],
        // Divider
        [',', 'argument', ''],
        // Second Column1
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        [',', 'argument', ''],
        ['1.2', 'operand', 'number'],
        ['', 'function', 'stop'],
        ['', 'function', 'stop'],
        ['', 'function', 'stop'],
        // End
        ['', 'function', 'stop']
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
          '={{1,1;1,2}\\{1,1;1,2}}',
          [
            ['ARRAY', 'function', 'start'],
            // First Column
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            [',', 'argument', ''],
            ['1.2', 'operand', 'number'],
            ['', 'function', 'stop'],
            ['', 'function', 'stop'],
            ['', 'function', 'stop'],
            // Divider
            [',', 'argument', ''],
            // Second Column1
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            [',', 'argument', ''],
            ['1.2', 'operand', 'number'],
            ['', 'function', 'stop'],
            ['', 'function', 'stop'],
            ['', 'function', 'stop'],
            // End
            ['', 'function', 'stop']
          ],
          options
        ]
      ].forEach(itBlock);
    });
  });
});
