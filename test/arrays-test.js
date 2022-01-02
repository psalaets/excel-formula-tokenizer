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
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['2.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['3.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop']
      ]
    ],
    // I don't think excel supports this at all but google sheets does
    [
      '{{1.1,1.2};{1.3,1.4}}',
      [
        ['ARRAY', 'function', 'start'],
        // First Row
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        [',', 'argument', ''],
        ['1.2', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
        ['ARRAYROW', 'function', 'stop'],
        // Divider
        [';', 'argument', ''],
        // Second Row
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.3', 'operand', 'number'],
        [',', 'argument', ''],
        ['1.4', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
        ['ARRAYROW', 'function', 'stop'],
        // End
        ['ARRAY', 'function', 'stop']
      ]
    ],
    // I don't think excel supports this at all but google sheets does
    [
      '{{1.1;1.2},{1.3;1.4}}',
      [
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        // First Column
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['1.2', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
        // Divider
        [',', 'argument', ''],
        // Second Column
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1.3', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['1.4', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
        // End
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop']
      ]
    ],
    // I don't think excel supports this at all but google sheets does
    [
      '{{1;2};{3;4}}',
      [
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['1', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['2', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['ARRAY', 'function', 'start'],
        ['ARRAYROW', 'function', 'start'],
        ['3', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        [';', 'argument', ''],
        ['ARRAYROW', 'function', 'start'],
        ['4', 'operand', 'number'],
        ['ARRAYROW', 'function', 'stop'],
        ['ARRAY', 'function', 'stop'],
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
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['2.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['3.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop']
          ],
          options
        ],
        // I don't think excel supports this at all but google sheets does
        [
          '{{1,1.1,2};{1,3.1,4}}',
          [
            ['ARRAY', 'function', 'start'],
            // First Row
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            [',', 'argument', ''],
            ['1.2', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            ['ARRAYROW', 'function', 'stop'],
            // Divider
            [';', 'argument', ''],
            // Second Row
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.3', 'operand', 'number'],
            [',', 'argument', ''],
            ['1.4', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            ['ARRAYROW', 'function', 'stop'],
            // End
            ['ARRAY', 'function', 'stop']
          ],
          options
        ],
        // I don't think excel supports this at all but google sheets does
        [
          '{{1,1;1,2}.{1,3;1,4}}',
          [
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            // First Column
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['1.2', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            // Divider
            [',', 'argument', ''],
            // Second Column
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1.3', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['1.4', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            // End
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop']
          ],
          options
        ],
        // I don't think excel supports this at all but google sheets does
        [
          '{{1;2};{3;4}}',
          [
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['1', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['2', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['ARRAY', 'function', 'start'],
            ['ARRAYROW', 'function', 'start'],
            ['3', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            [';', 'argument', ''],
            ['ARRAYROW', 'function', 'start'],
            ['4', 'operand', 'number'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop'],
            ['ARRAYROW', 'function', 'stop'],
            ['ARRAY', 'function', 'stop']
          ],
          options
        ]
      ].forEach(itBlock);
    });
  });
});
